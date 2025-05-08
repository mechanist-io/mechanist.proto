import { Logger as NestLogger } from '@nestjs/common';
export interface ILoggerMessage {
  message: string;
  info: object;
}

export interface ILoggerErrorMessage {
  error: object;
}
export class Logger {
  private readonly logger: NestLogger;

  public context: string;

  constructor(context: string) {
    this.context = context;
    this.logger = new NestLogger(context);
  }

  log(message: ILoggerMessage, context: string): void {
    this.logger.log(message, context);
  }

  error(message: ILoggerMessage & ILoggerErrorMessage, context: string): void {
    console.log('Error in logger:', message.error);
    this.logger.error(message, context);
  }

  warn(message: ILoggerMessage, context: string): void {
    this.logger.warn(message, context);
  }

  debug(message: ILoggerMessage, context: string): void {
    this.logger.debug(message, context);
  }
}
