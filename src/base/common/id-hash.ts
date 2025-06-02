import { createHash } from 'crypto';

export class IdHash {
  static generate(keys: string[], secret = ''): string {
    const text =
      secret + keys.reduce((previous, current) => previous + current, '');
    return createHash('md5').update(text).digest('hex');
  }
}
