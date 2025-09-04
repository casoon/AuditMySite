/**
 * 🚀 AuditMySite REST API Server
 * 
 * Express.js-based REST API for remote accessibility auditing.
 * Provides HTTP endpoints for all SDK functionality with authentication,
 * rate limiting, and comprehensive error handling.
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import * as swaggerUi from 'swagger-ui-express';
import { AuditSDK } from '../sdk/audit-sdk';
import {
  APIResponse,
  AuditJob,
  AuditJobRequest,
  AuditOptions,
  AuditResult,
  SDKConfig,
  AuditEventType
} from '../sdk/types';

// =============================================================================
// Types & Interfaces
// =============================================================================

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

interface AuthenticatedRequest extends Request {
  apiKey?: string;
  requestId: string;
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
          console.log(`📚 API Documentation: http://${this.config.host}:${this.config.port}/api-docs`);
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
    this.app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      req.requestId = uuidv4();
      res.setHeader('X-Request-ID', req.requestId);
      next();
    });

    // API Key authentication
    if (this.config.apiKeyRequired) {
      this.app.use(this.authenticateApiKey.bind(this));
    }

    // Swagger documentation
    if (this.config.enableSwagger) {
      const swaggerDocument = this.generateSwaggerDoc();
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', this.handleHealth.bind(this));
    
    // API info
    this.app.get('/api/v1/info', this.handleInfo.bind(this));
    
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
    this.app.use((error: Error, req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      console.error(`API Error [${req.requestId}]:`, error);
      
      const statusCode = (error as any).statusCode || 500;
      const response = this.createErrorResponse(
        (error as any).code || 'INTERNAL_ERROR',
        error.message || 'Internal server error',
        process.env.NODE_ENV === 'development' ? error.stack : undefined
      );
      
      res.status(statusCode).json(response);
    });
  }

  // =============================================================================
  // Route Handlers
  // =============================================================================

  private async handleHealth(req: Request, res: Response): Promise<void> {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: this.sdk.getVersion(),
      uptime: process.uptime(),
      jobs: {
        total: this.jobManager.jobs.size,
        running: this.jobManager.runningJobs.size
      }
    });
  }

  private async handleInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json(this.createSuccessResponse({
      name: 'AuditMySite API',
      version: this.sdk.getVersion(),
      description: 'REST API for accessibility auditing',
      endpoints: {
        health: '/health',
        docs: '/api-docs',
        audit: '/api/v1/audit',
        quickAudit: '/api/v1/audit/quick'
      },
      limits: {
        maxConcurrentJobs: this.config.maxConcurrentJobs,
        jobTimeout: this.config.jobTimeout
      }
    }));
  }

  private async handleCreateAudit(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const jobRequest: AuditJobRequest = req.body;
      
      if (!jobRequest.sitemapUrl) {
        return res.status(400).json(
          this.createErrorResponse('VALIDATION_ERROR', 'sitemapUrl is required')
        );
      }

      // Check concurrent job limit
      if (this.jobManager.runningJobs.size >= this.config.maxConcurrentJobs) {
        return res.status(429).json(
          this.createErrorResponse('TOO_MANY_JOBS', 'Maximum concurrent jobs reached')
        );
      }

      const jobId = uuidv4();
      const job: AuditJob = {
        id: jobId,
        status: 'pending',
        sitemapUrl: jobRequest.sitemapUrl,
        options: jobRequest.options || {},
        createdAt: new Date()
      };

      this.jobManager.jobs.set(jobId, job);
      
      // Start job asynchronously
      this.runAuditJob(job).catch(console.error);

      res.status(201).json(this.createSuccessResponse({ jobId, status: 'pending' }));
      
    } catch (error) {
      res.status(500).json(
        this.createErrorResponse('CREATE_AUDIT_ERROR', error instanceof Error ? error.message : String(error))
      );
    }
  }

  private async handleGetAudit(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      return res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
    }

    res.json(this.createSuccessResponse(job));
  }

  private async handleCancelAudit(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      return res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
    }

    if (job.status === 'running') {
      job.status = 'cancelled';
      this.jobManager.runningJobs.delete(jobId);
    }

    res.json(this.createSuccessResponse({ jobId, status: job.status }));
  }

  private async handleListAudits(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { status, limit = '10', offset = '0' } = req.query;
    
    let jobs = Array.from(this.jobManager.jobs.values());
    
    if (status) {
      jobs = jobs.filter(job => job.status === status);
    }
    
    const total = jobs.length;
    const limitNum = Math.min(parseInt(limit as string), 100);
    const offsetNum = parseInt(offset as string);
    
    jobs = jobs
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offsetNum, offsetNum + limitNum);

    res.json(this.createSuccessResponse({
      jobs,
      pagination: {
        total,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + limitNum < total
      }
    }));
  }

  private async handleQuickAudit(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { sitemapUrl, options } = req.body;
      
      if (!sitemapUrl) {
        return res.status(400).json(
          this.createErrorResponse('VALIDATION_ERROR', 'sitemapUrl is required')
        );
      }

      const result = await this.sdk.quickAudit(sitemapUrl, options);
      res.json(this.createSuccessResponse(result));
      
    } catch (error) {
      res.status(500).json(
        this.createErrorResponse('QUICK_AUDIT_ERROR', error instanceof Error ? error.message : String(error))
      );
    }
  }

  private async handleTestConnection(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { sitemapUrl } = req.body;
      
      if (!sitemapUrl) {
        return res.status(400).json(
          this.createErrorResponse('VALIDATION_ERROR', 'sitemapUrl is required')
        );
      }

      const result = await this.sdk.testConnection(sitemapUrl);
      res.json(this.createSuccessResponse(result));
      
    } catch (error) {
      res.status(500).json(
        this.createErrorResponse('CONNECTION_TEST_ERROR', error instanceof Error ? error.message : String(error))
      );
    }
  }

  private async handleGetReports(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { jobId } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job) {
      return res.status(404).json(
        this.createErrorResponse('JOB_NOT_FOUND', 'Audit job not found')
      );
    }

    if (job.status !== 'completed' || !job.result) {
      return res.status(400).json(
        this.createErrorResponse('JOB_NOT_COMPLETED', 'Job not completed yet')
      );
    }

    res.json(this.createSuccessResponse(job.result.reports));
  }

  private async handleDownloadReport(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { jobId, format } = req.params;
    const job = this.jobManager.jobs.get(jobId);
    
    if (!job || job.status !== 'completed' || !job.result) {
      return res.status(404).json(
        this.createErrorResponse('REPORT_NOT_FOUND', 'Report not found')
      );
    }

    const report = job.result.reports.find(r => r.format === format);
    if (!report) {
      return res.status(404).json(
        this.createErrorResponse('REPORT_FORMAT_NOT_FOUND', `Report format ${format} not found`)
      );
    }

    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const filename = path.basename(report.path);
      const mimeTypes: Record<string, string> = {
        html: 'text/html',
        markdown: 'text/markdown',
        json: 'application/json',
        csv: 'text/csv'
      };

      res.setHeader('Content-Type', mimeTypes[format] || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      const fileStream = fs.createReadStream(report.path);
      fileStream.pipe(res);
      
    } catch (error) {
      res.status(500).json(
        this.createErrorResponse('DOWNLOAD_ERROR', 'Failed to download report')
      );
    }
  }

  // =============================================================================
  // Helper Methods
  // =============================================================================

  private async authenticateApiKey(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const apiKey = req.headers['x-api-key'] as string || req.query.apiKey as string;
    
    if (!apiKey) {
      return res.status(401).json(
        this.createErrorResponse('API_KEY_MISSING', 'API key is required')
      );
    }

    if (!this.config.validApiKeys.includes(apiKey)) {
      return res.status(401).json(
        this.createErrorResponse('API_KEY_INVALID', 'Invalid API key')
      );
    }

    req.apiKey = apiKey;
    next();
  }

  private async runAuditJob(job: AuditJob): Promise<void> {
    const { id } = job;
    
    try {
      job.status = 'running';
      job.startedAt = new Date();
      this.jobManager.runningJobs.add(id);

      const result = await this.sdk.quickAudit(job.sitemapUrl, job.options);
      
      job.status = 'completed';
      job.completedAt = new Date();
      job.result = result;
      
    } catch (error) {
      job.status = 'failed';
      job.completedAt = new Date();
      job.error = error instanceof Error ? error.message : String(error);
      
    } finally {
      this.jobManager.runningJobs.delete(id);
      
      // Auto-cleanup jobs after 24 hours
      setTimeout(() => {
        this.jobManager.jobs.delete(id);
      }, 24 * 60 * 60 * 1000);
    }
  }

  private createSuccessResponse<T>(data: T): APIResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: this.sdk.getVersion(),
        requestId: uuidv4()
      }
    };
  }

  private createErrorResponse(code: string, message: string, details?: any): APIResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: this.sdk.getVersion(),
        requestId: uuidv4()
      }
    };
  }

  private generateSwaggerDoc() {
    return {
      openapi: '3.0.0',
      info: {
        title: 'AuditMySite API',
        version: this.sdk.getVersion(),
        description: 'REST API for accessibility auditing and testing'
      },
      servers: [
        {
          url: `http://${this.config.host}:${this.config.port}`,
          description: 'Development server'
        }
      ],
      // Simplified swagger doc - full implementation would be much larger
      paths: {
        '/health': {
          get: {
            summary: 'Health check',
            responses: {
              '200': {
                description: 'Service is healthy'
              }
            }
          }
        },
        '/api/v1/audit': {
          post: {
            summary: 'Create new audit job',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      sitemapUrl: { type: 'string' },
                      options: { type: 'object' }
                    }
                  }
                }
              }
            },
            responses: {
              '201': { description: 'Job created' },
              '400': { description: 'Invalid request' }
            }
          }
        }
      }
    };
  }
}
