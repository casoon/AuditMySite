/**
 * 🧪 API Endpoint Tests
 * 
 * Tests REST API routes, authentication, and job management.
 * Uses supertest for HTTP testing and mocks SDK calls.
 */

import request from 'supertest';
import { AuditAPIServer } from '../../src/api/server';
import { AuditSDK } from '../../src/sdk/audit-sdk';
import { createMockAuditResult } from '../setup';

// Mock the SDK to avoid real audits
jest.mock('../../src/sdk/audit-sdk', () => ({
  AuditSDK: jest.fn().mockImplementation(() => ({
    getVersion: jest.fn().mockReturnValue('1.6.1'),
    quickAudit: jest.fn().mockResolvedValue(createMockAuditResult()),
    testConnection: jest.fn().mockResolvedValue({ success: true })
  }))
}));

describe('AuditAPIServer', () => {
  let server: AuditAPIServer;
  let app: any;

  beforeEach(() => {
    server = new AuditAPIServer({
      port: 0, // Use random port for tests
      apiKeyRequired: false, // Disable auth for most tests
      maxConcurrentJobs: 2
    });
    app = server.getApp();
  });

  describe('Health and Info Endpoints', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'healthy',
        timestamp: expect.any(String),
        version: '1.6.1',
        uptime: expect.any(Number),
        jobs: {
          total: 0,
          running: 0
        }
      });
    });

    it('should return API information', async () => {
      const response = await request(app)
        .get('/api/v1/info')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: {
          name: 'AuditMySite API',
          version: '1.6.1',
          description: 'REST API for accessibility auditing',
          endpoints: expect.any(Object),
          limits: {
            maxConcurrentJobs: 2,
            jobTimeout: expect.any(Number)
          }
        },
        meta: expect.objectContaining({
          timestamp: expect.any(String),
          version: '1.6.1',
          requestId: expect.any(String)
        })
      });
    });

    it('should return 404 for unknown endpoints', async () => {
      const response = await request(app)
        .get('/unknown/endpoint')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Endpoint not found'
        },
        meta: expect.any(Object)
      });
    });
  });

  describe('Quick Audit Endpoint', () => {
    it('should run quick audit successfully', async () => {
      const requestData = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        options: {
          maxPages: 5,
          formats: ['json']
        }
      };

      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send(requestData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.sessionId).toBe('test-session-123');
      expect(response.body.data.summary.testedPages).toBe(3);
    });

    it('should validate required sitemap URL', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send({ options: { maxPages: 5 } })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toBe('sitemapUrl is required');
    });

    it('should handle SDK errors gracefully', async () => {
      const mockSDK = AuditSDK as jest.MockedClass<typeof AuditSDK>;
      const mockInstance = mockSDK.mock.instances[0];
      mockInstance.quickAudit.mockRejectedValueOnce(new Error('SDK failed'));

      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('QUICK_AUDIT_ERROR');
    });
  });

  describe('Test Connection Endpoint', () => {
    it('should test connection successfully', async () => {
      const response = await request(app)
        .post('/api/v1/test-connection')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
    });

    it('should handle connection failures', async () => {
      const mockSDK = AuditSDK as jest.MockedClass<typeof AuditSDK>;
      const mockInstance = mockSDK.mock.instances[0];
      mockInstance.testConnection.mockResolvedValueOnce({ 
        success: false, 
        error: 'Connection failed' 
      });

      const response = await request(app)
        .post('/api/v1/test-connection')
        .send({ sitemapUrl: 'https://broken.com/sitemap.xml' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(false);
      expect(response.body.data.error).toBe('Connection failed');
    });

    it('should require sitemap URL for connection test', async () => {
      const response = await request(app)
        .post('/api/v1/test-connection')
        .send({})
        .expect(400);

      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toBe('sitemapUrl is required');
    });
  });

  describe('Job Management Endpoints', () => {
    it('should create new audit job', async () => {
      const requestData = {
        sitemapUrl: 'https://example.com/sitemap.xml',
        options: { maxPages: 10 }
      };

      const response = await request(app)
        .post('/api/v1/audit')
        .send(requestData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.jobId).toBeDefined();
      expect(response.body.data.status).toBe('pending');
    });

    it('should get job status', async () => {
      // First create a job
      const createResponse = await request(app)
        .post('/api/v1/audit')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' });

      const jobId = createResponse.body.data.jobId;

      // Then get its status
      const statusResponse = await request(app)
        .get(`/api/v1/audit/${jobId}`)
        .expect(200);

      expect(statusResponse.body.success).toBe(true);
      expect(statusResponse.body.data.id).toBe(jobId);
      expect(statusResponse.body.data.status).toMatch(/pending|running|completed/);
    });

    it('should return 404 for non-existent job', async () => {
      const response = await request(app)
        .get('/api/v1/audit/non-existent-job')
        .expect(404);

      expect(response.body.error.code).toBe('JOB_NOT_FOUND');
    });

    it('should cancel running job', async () => {
      // Create a job
      const createResponse = await request(app)
        .post('/api/v1/audit')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' });

      const jobId = createResponse.body.data.jobId;

      // Cancel it
      const cancelResponse = await request(app)
        .delete(`/api/v1/audit/${jobId}`)
        .expect(200);

      expect(cancelResponse.body.success).toBe(true);
      expect(cancelResponse.body.data.jobId).toBe(jobId);
    });

    it('should list all jobs', async () => {
      // Create a couple of jobs
      await request(app)
        .post('/api/v1/audit')
        .send({ sitemapUrl: 'https://example1.com/sitemap.xml' });

      await request(app)
        .post('/api/v1/audit')
        .send({ sitemapUrl: 'https://example2.com/sitemap.xml' });

      const response = await request(app)
        .get('/api/v1/audits')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.jobs).toHaveLength(2);
      expect(response.body.data.pagination).toEqual({
        total: 2,
        limit: 10,
        offset: 0,
        hasMore: false
      });
    });

    it('should support pagination for job listing', async () => {
      const response = await request(app)
        .get('/api/v1/audits?limit=1&offset=0')
        .expect(200);

      expect(response.body.data.pagination.limit).toBe(1);
      expect(response.body.data.pagination.offset).toBe(0);
    });

    it('should filter jobs by status', async () => {
      const response = await request(app)
        .get('/api/v1/audits?status=pending')
        .expect(200);

      expect(response.body.success).toBe(true);
      // All returned jobs should be pending
      response.body.data.jobs.forEach((job: any) => {
        expect(job.status).toBe('pending');
      });
    });

    it('should enforce concurrent job limits', async () => {
      // Server is configured with maxConcurrentJobs: 2
      // Create 3 jobs rapidly
      await request(app).post('/api/v1/audit').send({ sitemapUrl: 'https://example1.com/sitemap.xml' });
      await request(app).post('/api/v1/audit').send({ sitemapUrl: 'https://example2.com/sitemap.xml' });
      
      const response = await request(app)
        .post('/api/v1/audit')
        .send({ sitemapUrl: 'https://example3.com/sitemap.xml' })
        .expect(429);

      expect(response.body.error.code).toBe('TOO_MANY_JOBS');
    });
  });

  describe('Authentication', () => {
    beforeEach(() => {
      // Create server with authentication enabled
      server = new AuditAPIServer({
        apiKeyRequired: true,
        validApiKeys: ['valid-key-123', 'another-valid-key']
      });
      app = server.getApp();
    });

    it('should require API key for protected endpoints', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(401);

      expect(response.body.error.code).toBe('API_KEY_MISSING');
    });

    it('should accept valid API key in header', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .set('X-API-Key', 'valid-key-123')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should accept valid API key in query parameter', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick?apiKey=valid-key-123')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should reject invalid API key', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .set('X-API-Key', 'invalid-key')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(401);

      expect(response.body.error.code).toBe('API_KEY_INVALID');
    });

    it('should allow access to health endpoint without API key', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
    });
  });

  describe('Rate Limiting', () => {
    it('should handle rate limiting gracefully', async () => {
      // Make many requests quickly to trigger rate limiting
      const requests = Array.from({ length: 120 }, () =>
        request(app).get('/health')
      );

      const responses = await Promise.allSettled(requests);
      
      // Some requests should be rate limited (status 429)
      const rateLimited = responses.some(
        (r: any) => r.status === 'fulfilled' && r.value.status === 429
      );

      expect(rateLimited).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON requests', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      // Express should handle malformed JSON automatically
    });

    it('should include request ID in error responses', async () => {
      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send({}) // Missing required sitemapUrl
        .expect(400);

      expect(response.body.meta.requestId).toBeDefined();
      expect(response.headers['x-request-id']).toBeDefined();
    });

    it('should handle internal server errors gracefully', async () => {
      const mockSDK = AuditSDK as jest.MockedClass<typeof AuditSDK>;
      const mockInstance = mockSDK.mock.instances[0];
      mockInstance.quickAudit.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      const response = await request(app)
        .post('/api/v1/audit/quick')
        .send({ sitemapUrl: 'https://example.com/sitemap.xml' })
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Response Format', () => {
    it('should return consistent response format for success', async () => {
      const response = await request(app)
        .get('/api/v1/info')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: expect.any(Object),
        meta: {
          timestamp: expect.any(String),
          version: expect.any(String),
          requestId: expect.any(String)
        }
      });
    });

    it('should return consistent response format for errors', async () => {
      const response = await request(app)
        .get('/api/v1/audit/non-existent')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: expect.any(String),
          message: expect.any(String)
        },
        meta: {
          timestamp: expect.any(String),
          version: expect.any(String),
          requestId: expect.any(String)
        }
      });
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should handle preflight requests', async () => {
      const response = await request(app)
        .options('/api/v1/info')
        .expect(204);

      expect(response.headers['access-control-allow-methods']).toBeDefined();
    });
  });
});
