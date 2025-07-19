#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const AuditMySiteTestSuite = require('./test-suite');

class TestRunner {
  constructor() {
    this.mockServerProcess = null;
    this.testSuite = new AuditMySiteTestSuite();
  }

  async startMockServer() {
    console.log('🚀 Starting mock server...');
    
    return new Promise((resolve, reject) => {
      this.mockServerProcess = spawn('node', ['test/mock-server/server.js'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      let serverReady = false;

      this.mockServerProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(`📡 Mock Server: ${output.trim()}`);
        
        if (output.includes('Mock server running on')) {
          serverReady = true;
          resolve();
        }
      });

      this.mockServerProcess.stderr.on('data', (data) => {
        console.error(`📡 Mock Server Error: ${data.toString()}`);
      });

      this.mockServerProcess.on('error', (error) => {
        console.error('💥 Failed to start mock server:', error);
        reject(error);
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        if (!serverReady) {
          reject(new Error('Mock server startup timeout'));
        }
      }, 10000);
    });
  }

  async stopMockServer() {
    if (this.mockServerProcess) {
      console.log('🛑 Stopping mock server...');
      this.mockServerProcess.kill('SIGTERM');
      
      return new Promise((resolve) => {
        this.mockServerProcess.on('close', () => {
          console.log('✅ Mock server stopped');
          resolve();
        });
        
        // Force kill after 5 seconds
        setTimeout(() => {
          this.mockServerProcess.kill('SIGKILL');
          resolve();
        }, 5000);
      });
    }
  }

  async runTests() {
    try {
      // Start mock server
      await this.startMockServer();
      
      // Wait a moment for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Run test suite
      console.log('\n🧪 Starting test suite...');
      const testReport = await this.testSuite.runAllTests();
      
      // Validate expected results
      const validationResults = await this.testSuite.validateExpectedResults();
      
      // Generate final report
      this.generateFinalReport(testReport, validationResults);
      
      return {
        testReport,
        validationResults,
        success: testReport.passedTests === testReport.totalTests
      };
      
    } catch (error) {
      console.error('💥 Test runner failed:', error);
      throw error;
    } finally {
      // Always stop the mock server
      await this.stopMockServer();
    }
  }

  generateFinalReport(testReport, validationResults) {
    console.log('\n📋 Final Test Report');
    console.log('====================');
    
    const totalTests = testReport.totalTests;
    const passedTests = testReport.passedTests;
    const failedTests = testReport.failedTests;
    const successRate = (passedTests / totalTests) * 100;
    
    console.log(`📊 Test Results: ${passedTests}/${totalTests} passed (${successRate.toFixed(1)}%)`);
    
    if (failedTests > 0) {
      console.log('\n❌ Failed Tests:');
      testReport.testDetails
        .filter(test => !test.success)
        .forEach(test => {
          console.log(`   - ${test.name} (Exit Code: ${test.exitCode})`);
        });
    }
    
    const validTests = validationResults.filter(v => v.passed).length;
    const invalidTests = validationResults.filter(v => !v.passed).length;
    
    console.log(`\n🔍 Validation Results: ${validTests}/${validationResults.length} valid`);
    
    if (invalidTests > 0) {
      console.log('\n⚠️  Validation Issues:');
      validationResults
        .filter(v => !v.passed)
        .forEach(v => {
          console.log(`   - ${v.testName} (${v.expectedPage}):`);
          v.issues.forEach(issue => console.log(`     * ${issue}`));
        });
    }
    
    if (testReport.recommendations.length > 0) {
      console.log('\n🔧 Recommendations:');
      testReport.recommendations.forEach(rec => console.log(`   - ${rec}`));
    }
    
    // Overall assessment
    console.log('\n🎯 Overall Assessment:');
    if (successRate === 100 && invalidTests === 0) {
      console.log('✅ EXCELLENT: All tests passed and results are valid');
    } else if (successRate >= 80 && invalidTests <= 1) {
      console.log('✅ GOOD: Most tests passed with minor issues');
    } else if (successRate >= 60) {
      console.log('⚠️  FAIR: Some tests failed, needs attention');
    } else {
      console.log('❌ POOR: Many tests failed, significant issues detected');
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const runner = new TestRunner();
  
  runner.runTests()
    .then((results) => {
      console.log('\n🎉 Test runner completed!');
      process.exit(results.success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Test runner failed:', error);
      process.exit(1);
    });
}

module.exports = TestRunner; 