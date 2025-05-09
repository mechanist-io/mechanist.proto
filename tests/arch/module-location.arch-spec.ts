import { join } from 'path';
import { glob } from 'glob';

describe('Module Location Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure module files are at the top level of their module folders', async () => {
    const files = await glob('**/*.module.ts', { cwd: srcDir });
    const violations = files.filter((file) => {
      // Allow app.module.ts to be directly in src directory
      if (file === 'app.module.ts') {
        return false;
      }

      // Check if the file is in a subdirectory of its module
      // For example: 'user/controllers/user.module.ts' should be 'user/user.module.ts'
      const parts = file.split('/');
      const moduleName = parts[0]; // Get the module name (first directory)
      const fileName = parts[parts.length - 1]; // Get the file name
      const expectedPath = `${moduleName}/${fileName}`; // Expected path: module-name/module-name.module.ts

      return file !== expectedPath;
    });

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        `Found module files in incorrect locations: ${violations.join(', ')}`,
      );
      console.error(
        'Module files should be at the top level of their module folders (except app.module.ts which can be in src directory)',
      );
    }
  });
});
