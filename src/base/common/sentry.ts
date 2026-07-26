import * as Sentry from '@sentry/node';

export class SentryProxy {
  static init(options: Sentry.NodeOptions) {
    Sentry.init(options);
  }

  static captureException(
    exception: unknown,
    options: { tags: Record<string, string>; extra: Record<string, any> },
  ) {
    Sentry.captureException(exception, options);
  }

  static captureMessage(
    message: string,
    options?: {
      level: Sentry.SeverityLevel;
      tags: Record<string, string>;
      extra: Record<string, any>;
    },
  ) {
    Sentry.captureMessage(message, options);
  }
}
