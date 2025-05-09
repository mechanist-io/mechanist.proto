import { join } from 'path';
import { glob } from 'glob';
import * as fs from 'fs';

describe('DTO Import Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure proper DTO imports across the application', async () => {
    const serviceFiles = await glob('**/*.service.ts', { cwd: srcDir });
    const controllerFiles = await glob('**/*.controller.ts', { cwd: srcDir });
    const violations: string[] = [];

    // Check service files
    for (const file of serviceFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Services should not import from controller DTOs
      if (content.includes('/dtos/controller/')) {
        violations.push(
          `${file} - Should not import from controller DTOs. Services should only use service DTOs.`,
        );
      }
    }

    // Check controller files
    for (const file of controllerFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Controllers can import from both controller and service DTOs
      if (content.includes('/dtos/')) {
        const hasValidImport =
          content.includes('/dtos/controller/') ||
          content.includes('/dtos/service/');
        if (!hasValidImport) {
          violations.push(
            `${file} - Should only import from dtos/controller or dtos/service`,
          );
        }
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found files with incorrect DTO imports:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
