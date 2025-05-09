import { join } from 'path';
import { glob } from 'glob';

describe('Exception Location Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure exception files follow the correct structure and naming conventions', async () => {
    const files = await glob('**/*.exception.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of files) {
      // Check if file is in exceptions directory
      if (!file.includes('/exceptions/')) {
        violations.push(`${file} - Must be in exceptions directory`);
        continue;
      }

      // Check if file is directly in exceptions folder (not allowed)
      if (file.match(/\/exceptions\/[^/]+\.exception\.ts$/)) {
        violations.push(
          `${file} - Cannot be directly in exceptions folder, must be in client or server subdirectory`,
        );
        continue;
      }

      // Check client exceptions
      if (file.includes('.client.exception.ts')) {
        if (!file.includes('/exceptions/client/')) {
          violations.push(
            `${file} - Client exceptions must be in exceptions/client directory`,
          );
        }
      }

      // Check server exceptions
      if (file.includes('.server.exception.ts')) {
        if (!file.includes('/exceptions/server/')) {
          violations.push(
            `${file} - Server exceptions must be in exceptions/server directory`,
          );
        }
      }

      // Check for exceptions without client/server prefix
      if (
        !file.includes('.client.exception.ts') &&
        !file.includes('.server.exception.ts')
      ) {
        violations.push(
          `${file} - Exception files must be either client or server exceptions`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found exception files with incorrect structure:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
