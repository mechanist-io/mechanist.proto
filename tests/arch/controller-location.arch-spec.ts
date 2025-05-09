import { join } from 'path';
import { glob } from 'glob';

describe('Controller Location Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure controller files are only in controllers directory', async () => {
    const files = await glob('**/*.controller.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of files) {
      // Check if file is in controllers directory
      if (!file.includes('/controllers/')) {
        violations.push(`${file} - Must be in controllers directory`);
        continue;
      }

      // Check if file is directly in module root or other directories
      const parts = file.split('/');
      const moduleName = parts[0];

      // If file is directly in module root or in wrong directory
      if (
        parts.length === 2 ||
        (parts.length > 2 && parts[1] !== 'controllers')
      ) {
        violations.push(
          `${file} - Controller files must be in ${moduleName}/controllers/ directory`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found controller files in incorrect locations:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
