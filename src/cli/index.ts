/**
 * 🔧 CLI System Exports
 * 
 * Clean exports for the new command-based CLI system.
 */

// Command system
export { CommandRegistry } from './command-registry';

// Base command classes
export { BaseCommand, CommandArgs, CommandResult } from './commands/base-command';

// Concrete commands
export { AuditCommand, AuditCommandArgs } from './commands/audit-command';

// Re-export for convenience
export type {
  CommandArgs as CLICommandArgs,
  CommandResult as CLICommandResult
} from './commands/base-command';
