import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { UUID } from 'uuidjs';
import { Logger } from 'src/base/common/logger';

interface HttpExceptionBody {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  override catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const trackId = UUID.genV6().toString();

    const exceptionResponse =
      exception instanceof HttpException
        ? (exception.getResponse() as HttpExceptionBody)
        : { message: 'Internal server error' };

    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(
      {
        message:
          exception instanceof HttpException
            ? exception.message
            : 'Unhandled exception occurred',
        error: {
          name: exception instanceof Error ? exception.name : 'UnknownError',
          message:
            exception instanceof Error ? exception.message : String(exception),
          stack,
          response: exceptionResponse,
          status,
          trackId,
        },
        info: {
          isCritical: status >= 500,
          url: request.url,
          method: request.method,
          trackId,
          requestBody: request.body,
          requestQuery: request.query,
          requestParams: request.params,
          ip: request.ip,
          userAgent:
            request.headers['user-agent'] ??
            request.headers['User-Agent'] ??
            null,
          userId:
            typeof request.user === 'object'
              ? ((request.user as any).sub ?? null)
              : (request.user ?? null),
        },
      },
      this.logger.context,
    );

    response.status(status).json({
      trackId,
      ...exceptionResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
