import { join } from 'path';
import { glob } from 'glob';
import * as fs from 'fs';

describe('Controller Import Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure controllers do not import from services', async () => {
    const controllerFiles = await glob('**/*.controller.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of controllerFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Check for imports from services
      if (content.includes('/services/')) {
        violations.push(
          `${file} - Should not import from services. Controllers should not depend on services.`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found controllers importing from services:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });

  it('should ensure controllers only import from their respective DTOs', async () => {
    const controllerFiles = await glob('**/*.controller.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of controllerFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');
      const controllerDir = file.split('/').slice(0, -1).join('/');

      // Check for imports from other DTOs
      if (
        content.includes('/dtos/') &&
        !content.includes(`${controllerDir}/dtos/`)
      ) {
        violations.push(
          `${file} - Should only import DTOs from its own directory.`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        'Found controllers importing from incorrect DTO locations:',
      );
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
