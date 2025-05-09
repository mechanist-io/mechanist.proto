import { join } from 'path';
import { glob } from 'glob';

describe('Service Location Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure service files are only in services directory', async () => {
    const files = await glob('**/*.service.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of files) {
      // Check if file is in services directory
      if (!file.includes('/services/')) {
        violations.push(`${file} - Must be in services directory`);
        continue;
      }

      // Check if file is directly in module root or other directories
      const parts = file.split('/');
      const moduleName = parts[0];

      // If file is directly in module root or in wrong directory
      if (parts.length === 2 || (parts.length > 2 && parts[1] !== 'services')) {
        violations.push(
          `${file} - Service files must be in ${moduleName}/services/ directory`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found service files in incorrect locations:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
