/**
 * 🔧 Base Command Class
 * 
 * Abstract base class for all CLI commands.
 * Implements the Command Pattern for better separation of concerns.
 */

export interface CommandArgs {
  [key: string]: any;
}

export interface CommandResult {
  success: boolean;
  message?: string;
  data?: any;
  exitCode?: number;
}

export abstract class BaseCommand {
  protected name: string;
  protected description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  /**
   * Execute the command
   */
  abstract execute(args: CommandArgs): Promise<CommandResult>;

  /**
   * Validate command arguments
   */
  protected validate(args: CommandArgs): { valid: boolean; errors: string[] } {
    // Default implementation - override in subclasses
    return { valid: true, errors: [] };
  }

  /**
   * Get command name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * Format error messages
   */
  protected formatError(error: Error | string): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  /**
   * Create success result
   */
  protected success(message?: string, data?: any): CommandResult {
    return {
      success: true,
      message,
      data,
      exitCode: 0
    };
  }

  /**
   * Create error result
   */
  protected error(message: string, exitCode: number = 1): CommandResult {
    return {
      success: false,
      message,
      exitCode
    };
  }

  /**
   * Log progress message
   */
  protected logProgress(message: string): void {
    console.log(`🚀 ${message}`);
  }

  /**
   * Log success message
   */
  protected logSuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  /**
   * Log warning message
   */
  protected logWarning(message: string): void {
    console.log(`⚠️  ${message}`);
  }

  /**
   * Log error message
   */
  protected logError(message: string): void {
    console.error(`❌ ${message}`);
  }

  /**
   * Format duration in human-readable format
   */
  protected formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Parse sitemap URL and validate
   */
  protected validateSitemapUrl(url: string): { valid: boolean; error?: string } {
    try {
      const parsedUrl = new URL(url);
      
      // Check if it's a valid HTTP/HTTPS URL
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return { valid: false, error: 'URL must use HTTP or HTTPS protocol' };
      }

      // Check if it looks like a sitemap
      const path = parsedUrl.pathname.toLowerCase();
      if (!path.includes('sitemap') && !path.endsWith('.xml')) {
        return { 
          valid: false, 
          error: 'URL should point to a sitemap.xml file or contain "sitemap" in the path' 
        };
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid URL format' };
    }
  }

  /**
   * Extract domain from URL for reporting
   */
  protected extractDomain(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.replace(/\./g, '-');
    } catch {
      return 'unknown-domain';
    }
  }
}
