/**
 * 🚀 AuditMySite REST API Server
 * 
 * Express.js-based REST API for remote accessibility auditing.
 * Clean implementation for v1.8.0 with full TypeScript compatibility.
 */

import express, { Express, Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import { AuditSDK } from '../sdk/audit-sdk';
import {
  APIResponse,
  AuditJob,
  AuditJobRequest,
  AuditOptions,
  AuditResult,
  SDKConfig,
  ProgressData
} from '../sdk/types';

// =============================================================================
// Type Definitions
// =============================================================================

// Extend Express Request globally
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      apiKey?: string;
    }
  }
}

type AuthenticatedRequest = Request;

interface APIConfig {
  port: number;
  host: string;
  apiKeyRequired: boolean;
  validApiKeys: string[];
  maxConcurrentJobs: number;
  jobTimeout: number;
  enableSwagger: boolean;
  corsOrigins: string[];
}

interface JobManager {
  jobs: Map<string, AuditJob>;
  runningJobs: Set<string>;
  maxConcurrent: number;
}

// =============================================================================
// API Server Class
// =============================================================================

export class AuditAPIServer {
  private app: Express;
  private config: APIConfig;
  private jobManager: JobManager;
  private sdk: AuditSDK;

  constructor(config: Partial<APIConfig> = {}) {
    this.config = this.mergeConfig(config);
    this.jobManager = {
      jobs: new Map(),
      runningJobs: new Set(),
      maxConcurrent: this.config.maxConcurrentJobs
    };
    this.sdk = new AuditSDK();
    this.app = express();
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * Start the API server
   */
  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const server = this.app.listen(this.config.port, this.config.host, () => {
          console.log(`🚀 AuditMySite API Server running at http://${this.config.host}:${this.config.port}`);
          resolve();
        });

        server.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get Express app instance (for testing)
   */
  getApp(): Express {
    return this.app;
  }

  private mergeConfig(config: Partial<APIConfig>): APIConfig {
    return {
      port: 3000,
      host: '0.0.0.0',
      apiKeyRequired: process.env.NODE_ENV === 'production',
      validApiKeys: process.env.API_KEYS?.split(',') || [],
      maxConcurrentJobs: 5,
      jobTimeout: 300000, // 5 minutes
      enableSwagger: true,
      corsOrigins: ['*'],
      ...config
    };
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors({
      origin: this.config.corsOrigins,
      credentials: true
    }));

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: this.createErrorResponse('RATE_LIMIT_EXCEEDED', 'Too many requests'),
      standardHeaders: true,
      legacyHeaders: false
    });
    this.app.use(limiter);

    // Request ID middleware
    const requestIdHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
      req.requestId = uuidv4();
      res.setHeader('X-Request-ID', req.requestId);
      next();
    };
    this.app.use(requestIdHandler);
  }

  private setupRoutes(): void {
    // Health check (no auth required)
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.8.0',
          uptime: process.uptime(),
          jobs: {
            total: this.jobManager.jobs.size,
            running: this.jobManager.runningJobs.size
          }
        }
      });
    });
    
    // Apply API Key authentication to API endpoints only
    if (this.config.apiKeyRequired) {
      this.app.use('/api/v1/*', this.authenticateApiKey.bind(this));
    }
    
    // API info
    this.app.get('/api/v1/info', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          name: 'AuditMySite API',
          version: '1.8.0',
          description: 'REST API for accessibility testing',
          endpoints: ['/health', '/api/v1/audit', '/api/v1/audit/quick'],
          maxConcurrentJobs: this.config.maxConcurrentJobs
        }
      });
    });
    
    // Audit endpoints
    this.app.post('/api/v1/audit', this.handleCreateAudit.bind(this));
    this.app.get('/api/v1/audit/:jobId', this.handleGetAudit.bind(this));
    this.app.delete('/api/v1/audit/:jobId', this.handleCancelAudit.bind(this));
    this.app.get('/api/v1/audits', this.handleListAudits.bind(this));
    
    // Quick audit endpoint
    this.app.post('/api/v1/audit/quick', this.handleQuickAudit.bind(this));
    
    // Test connection endpoint
    this.app.post('/api/v1/test-connection', this.handleTestConnection.bind(this));
    
    // Reports endpoints
    this.app.get('/api/v1/audit/:jobId/reports', this.handleGetReports.bind(this));
    this.app.get('/api/v1/audit/:jobId/reports/:format', this.handleDownloadReport.bind(this));

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json(this.createErrorResponse('NOT_FOUND', 'Endpoint not found'));
    });
  }

  private setupErrorHandling(): void {
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(`API Error [${req.requestId}]:`, error);
      
      const statusCode = (error as any).statusCode || 500;
      const response = this.createErrorResponse(
        (error as any).code || 'INTERNAL_ERROR',
        error.message || 'Internal server error'
      );
      
      res.status(statusCode).json(response);
    });
  }

  private async authenticateApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
    const apiKey = req.headers['x-api-key'] as string || req.query.apiKey as string;
    
    if (!apiKey) {
      res.status(401).json(this.createErrorResponse('AUTH_REQUIRED', 'API key required'));
      return;
    }
    
    if (!this.config.validApiKeys.includes(apiKey)) {
      res.status(401).json(this.createErrorResponse('INVALID_API_KEY', 'Invalid API key'));
      return;
    }
    
    req.apiKey = apiKey;
    next();
  }

  private async handleCreateAudit(req: Request, res: Response): Promise<void> {
    try {
      const jobRequest: AuditJobRequest = req.body;
      const jobId = uuidv4();
      
      // Validate input
      if (!jobRequest.sitemapUrl) {
        res.status(400).json(
          this.createErrorResponse('INVALID_INPUT', 'sitemapUrl is required')
        );
        return;
      }
      
      // Check concurrent job limit
      if (this.jobManager.runningJobs.size >= this.config.maxConcurrentJobs) {
        res.status(429).json(
          this.createErrorResponse('TOO_MANY_JOBS', 'Maximum concurrent jobs reached')
        );
        return;
      }
      
      // Create job
      const job: AuditJob = {
        id: jobId,
        status: 'pending',
        sitemapUrl: jobRequest.sitemapUrl,
        options: jobRequest.options || {},
        createdAt: new Date(),
        progress: { current: 0, total: 100, percentage: 0 }
      };
      
      this.jobManager.jobs.set(jobId, job);
      
      // Start audit in background
      this.startAuditJob(jobId).catch(error => {
        console.error(`Job ${jobId} failed:`, error);
        const failedJob = this.jobManager.jobs.get(jobId);
        if (failedJob) {
          failedJob.status = 'failed';
          failedJob.error = error.message;
          failedJob.completedAt = new Date();
        }
      });
      
      res.status(201).json({
        success: true,
        data: { jobId, status: 'pending' }
      });
      
    } catch (error) {
      res.status(500).json(this.createErrorResponse('INTERNAL_ERROR', 'Failed to create audit'));
    }
  }

  private async handleGetAudit(req: Request, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
      return;
    }
    
    res.json({
      success: true,
      data: job
    });
  }

  private async handleCancelAudit(req: Request, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
      return;
    }
    
    job.status = 'cancelled';
    job.completedAt = new Date();
    this.jobManager.runningJobs.delete(jobId);
    
    res.json({
      success: true,
      data: { jobId, status: 'cancelled' }
    });
  }

  private async handleListAudits(req: Request, res: Response): Promise<void> {
    const { status, limit = '10', offset = '0' } = req.query;
    
    let jobs = Array.from(this.jobManager.jobs.values());
    
    if (status) {
      jobs = jobs.filter(job => job.status === status);
    }
    
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedJobs = jobs.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        jobs: paginatedJobs,
        total: jobs.length,
        offset: startIndex,
        limit: parseInt(limit as string)
      }
    });
  }

  private async handleQuickAudit(req: Request, res: Response): Promise<void> {
    try {
      const { sitemapUrl, options } = req.body;
      
      if (!sitemapUrl) {
        res.status(400).json(
          this.createErrorResponse('INVALID_INPUT', 'sitemapUrl is required')
        );
        return;
      }
      
      const result = await this.sdk.quickAudit(sitemapUrl, options || {});
      
      res.json({
        success: true,
        data: result
      });
      
    } catch (error) {
      res.status(500).json(this.createErrorResponse('AUDIT_ERROR', 'Audit failed'));
    }
  }

  private async handleTestConnection(req: Request, res: Response): Promise<void> {
    try {
      const { sitemapUrl } = req.body;
      
      if (!sitemapUrl) {
        res.status(400).json(
          this.createErrorResponse('INVALID_INPUT', 'sitemapUrl is required')
        );
        return;
      }
      
      const result = await this.sdk.testConnection(sitemapUrl);
      
      res.json({
        success: true,
        data: result
      });
      
    } catch (error) {
      res.status(500).json(this.createErrorResponse('CONNECTION_ERROR', 'Connection test failed'));
    }
  }

  private async handleGetReports(req: Request, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
      return;
    }
    
    if (job.status !== 'completed' || !job.result) {
      res.status(400).json(
        this.createErrorResponse('JOB_NOT_COMPLETE', 'Job not completed yet')
      );
      return;
    }
    
    res.json({
      success: true,
      data: {
        reports: job.result.reports || []
      }
    });
  }

  private async handleDownloadReport(req: Request, res: Response): Promise<void> {
    const { jobId, format } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
      return;
    }
    
    if (job.status !== 'completed' || !job.result) {
      res.status(404).json(
        this.createErrorResponse('REPORT_NOT_FOUND', 'Report not available')
      );
      return;
    }
    
    const report = job.result.reports?.find(r => r.format === format);
    if (!report) {
      res.status(404).json(
        this.createErrorResponse('REPORT_NOT_FOUND', `Report in ${format} format not found`)
      );
      return;
    }
    
    res.json({
      success: true,
      data: report
    });
  }

  private async startAuditJob(jobId: string): Promise<void> {
    const job = this.jobManager.jobs.get(jobId);
    if (!job) return;
    
    job.status = 'running';
    job.startedAt = new Date();
    this.jobManager.runningJobs.add(jobId);
    
    try {
      const result = await this.sdk.quickAudit(job.sitemapUrl, job.options);
      
      job.status = 'completed';
      job.result = result;
      job.completedAt = new Date();
      job.progress = { current: 100, total: 100, percentage: 100 };
      
    } catch (error) {
      job.status = 'failed';
      job.error = (error as Error).message;
      job.completedAt = new Date();
    } finally {
      this.jobManager.runningJobs.delete(jobId);
    }
  }

  private createErrorResponse(code: string, message: string, details?: any): APIResponse<null> {
    return {
      success: false,
      error: {
        code,
        message,
        details
      },
      data: null
    };
  }
}
