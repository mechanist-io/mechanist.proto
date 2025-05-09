import { join } from 'path';
import { glob } from 'glob';
import * as fs from 'fs';

describe('Controller Import Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure controllers only import DTOs from dtos/controller directories', async () => {
    const controllerFiles = await glob('**/*.controller.ts', {
      cwd: srcDir,
      ignore: ['**/base/exceptions/**'], // Ignore base exceptions
    });
    const violations: string[] = [];

    for (const file of controllerFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Check for DTO imports
      const dtoImports = content.match(/import.*from.*['"].*dto['"]/g) || [];

      for (const importStatement of dtoImports) {
        // Check if the import path contains dtos/controller
        if (!importStatement.includes('/dtos/controller/')) {
          violations.push(
            `${file} - Invalid DTO import: ${importStatement}. DTOs must be imported from a module's dtos/controller directory.`,
          );
        }
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

  it('should ensure controllers only import services from their module services directory', async () => {
    const files = await glob('**/*.controller.ts', {
      cwd: srcDir,
      ignore: ['**/base/exceptions/**'], // Ignore base exceptions
    });
    const violations: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');
      const moduleName = file.split('/')[0];

      // Check for service imports
      const serviceImports =
        content.match(/import.*from.*['"].*service['"]/g) || [];

      for (const importStatement of serviceImports) {
        // Allow both relative path imports (../services/) and absolute path imports (moduleName/services/)
        const isRelativePath = importStatement.includes('../services/');
        const isAbsolutePath = importStatement.includes(
          `/${moduleName}/services/`,
        );

        if (!isRelativePath && !isAbsolutePath) {
          violations.push(
            `${file} - Invalid service import: ${importStatement}. Services must be imported from either relative path (../services/) or absolute path (${moduleName}/services/).`,
          );
        }
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found controllers with invalid service imports:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
