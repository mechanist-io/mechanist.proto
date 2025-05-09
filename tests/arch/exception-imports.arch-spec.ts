import { join } from 'path';
import { glob } from 'glob';
import * as fs from 'fs';

describe('Exception Import Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');
  const nestExceptions = [
    'BadRequestException',
    'UnauthorizedException',
    'NotFoundException',
    'ForbiddenException',
    'NotAcceptableException',
    'RequestTimeoutException',
    'ConflictException',
    'GoneException',
    'HttpVersionNotSupportedException',
    'PayloadTooLargeException',
    'UnsupportedMediaTypeException',
    'UnprocessableEntityException',
    'InternalServerErrorException',
    'NotImplementedException',
    'ImATeapotException',
    'MethodNotAllowedException',
    'BadGatewayException',
    'ServiceUnavailableException',
    'GatewayTimeoutException',
    'PreconditionFailedException',
  ];

  it('should ensure NestJS exceptions are not directly imported from @nestjs/common except in exceptions folder', async () => {
    const files = await glob('**/*.ts', {
      cwd: srcDir,
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/exceptions/**', // Ignore files in exceptions folder
        '**/base/exceptions/**', // Ignore base exceptions
      ],
    });

    const violations: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Check for direct imports from @nestjs/common
      if (content.includes("from '@nestjs/common'")) {
        // Check if any NestJS exception is imported
        const hasExceptionImport = nestExceptions.some(
          (exception) =>
            content.includes(`import { ${exception}`) ||
            content.includes(`import {${exception}`),
        );

        if (hasExceptionImport) {
          violations.push(
            `${file} - Directly imports NestJS exceptions from @nestjs/common. Use custom exceptions from exceptions folder instead.`,
          );
        }
      }

      // Check for direct usage of NestJS exceptions
      const hasDirectExceptionUsage = nestExceptions.some(
        (exception) =>
          content.includes(`new ${exception}`) ||
          content.includes(`throw ${exception}`),
      );

      if (hasDirectExceptionUsage) {
        violations.push(
          `${file} - Directly uses NestJS exceptions. Use custom exceptions from exceptions folder instead.`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found files with direct NestJS exception usage:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
