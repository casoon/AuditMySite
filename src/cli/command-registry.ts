/**
 * 🔧 Command Registry
 * 
 * Central registry for all CLI commands.
 * Manages command registration, validation, and execution.
 */

import { BaseCommand, CommandArgs, CommandResult } from './commands/base-command';
import { AuditCommand } from './commands/audit-command';

export class CommandRegistry {
  private commands: Map<string, BaseCommand> = new Map();

  constructor() {
    this.registerBuiltinCommands();
  }

  /**
   * Register built-in commands
   */
  private registerBuiltinCommands(): void {
    this.register(new AuditCommand());
    
    // Future commands can be registered here:
    // this.register(new InitCommand());
    // this.register(new ValidateCommand());
    // this.register(new ConfigCommand());
  }

  /**
   * Register a new command
   */
  register(command: BaseCommand): void {
    const name = command.getName();
    
    if (this.commands.has(name)) {
      throw new Error(`Command '${name}' is already registered`);
    }
    
    this.commands.set(name, command);
  }

  /**
   * Get a command by name
   */
  getCommand(name: string): BaseCommand | undefined {
    return this.commands.get(name);
  }

  /**
   * Check if command exists
   */
  hasCommand(name: string): boolean {
    return this.commands.has(name);
  }

  /**
   * Get all registered commands
   */
  getCommands(): Map<string, BaseCommand> {
    return new Map(this.commands);
  }

  /**
   * Execute a command
   */
  async executeCommand(name: string, args: CommandArgs): Promise<CommandResult> {
    const command = this.getCommand(name);
    
    if (!command) {
      return {
        success: false,
        message: `Unknown command: ${name}`,
        exitCode: 1
      };
    }

    try {
      return await command.execute(args);
    } catch (error) {
      return {
        success: false,
        message: `Command execution failed: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: 1
      };
    }
  }

  /**
   * Get help information for all commands
   */
  getHelpText(): string {
    const lines: string[] = [];
    lines.push('Available commands:\n');

    for (const [name, command] of this.commands) {
      lines.push(`  ${name.padEnd(20)} ${command.getDescription()}`);
    }

    return lines.join('\n');
  }

  /**
   * Unregister a command
   */
  unregister(name: string): boolean {
    return this.commands.delete(name);
  }

  /**
   * Clear all commands
   */
  clear(): void {
    this.commands.clear();
  }

  /**
   * Get command count
   */
  size(): number {
    return this.commands.size;
  }
}
