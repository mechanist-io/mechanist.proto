import { join } from 'path';
import { glob } from 'glob';
import * as fs from 'fs';

describe('Service Import Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure services do not import from controllers', async () => {
    const serviceFiles = await glob('**/*.service.ts', { cwd: srcDir });
    const violations: string[] = [];

    for (const file of serviceFiles) {
      const content = fs.readFileSync(join(srcDir, file), 'utf-8');

      // Check for imports from controllers
      if (content.includes('/controllers/')) {
        violations.push(
          `${file} - Should not import from controllers. Services should not depend on controllers.`,
        );
      }
    }

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Found services importing from controllers:');
      violations.forEach((violation) => console.error(`- ${violation}`));
    }
  });
});
