import { join } from 'path';
import { glob } from 'glob';

describe('Root Files Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');
  const allowedRootFiles = ['app.module.ts', 'main.ts'];

  it('should ensure only app.module.ts and main.ts exist in src root directory', async () => {
    const rootFiles = await glob('*.ts', { cwd: srcDir });
    const violations: string[] = [];

    // Check for unexpected files
    for (const file of rootFiles) {
      if (!allowedRootFiles.includes(file)) {
        violations.push(
          `${file} - Should not be in src root directory. Only app.module.ts and main.ts are allowed.`,
        );
      }
    }

    // Check for missing required files
    for (const requiredFile of allowedRootFiles) {
      if (!rootFiles.includes(requiredFile)) {
        violations.push(`${requiredFile} - Must exist in src root directory.`);
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found issues with root directory files:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
