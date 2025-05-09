import { join } from 'path';
import { glob } from 'glob';

describe('DTO Location Architecture Tests', () => {
  const srcDir = join(process.cwd(), 'src');

  it('should ensure controller response DTOs are in the correct directory', async () => {
    const files = await glob('**/*.response.rest.dto.ts', { cwd: srcDir });
    const violations = files.filter(
      (file) =>
        !file.includes('/dtos/controller/response/') &&
        !file.includes('/dtos/controller/responses/'),
    );

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        `Found controller response DTOs in incorrect locations: ${violations.join(', ')}`,
      );
    }
  });

  it('should ensure controller request DTOs are in the correct directory', async () => {
    const files = await glob('**/*.request.rest.dto.ts', { cwd: srcDir });
    const violations = files.filter(
      (file) => !file.includes('/dtos/controller/requests/'),
    );

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        `Found controller request DTOs in incorrect locations: ${violations.join(', ')}`,
      );
    }
  });

  it('should ensure service request DTOs are in the correct directory', async () => {
    const files = await glob('**/*.request.dto.ts', { cwd: srcDir });
    const violations = files.filter(
      (file) => !file.includes('/dtos/service/requests/'),
    );

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        `Found service request DTOs in incorrect locations: ${violations.join(', ')}`,
      );
    }
  });

  it('should ensure service response DTOs are in the correct directory', async () => {
    const files = await glob('**/*.response.dto.ts', { cwd: srcDir });
    const violations = files.filter(
      (file) => !file.includes('/dtos/service/responses/'),
    );

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error(
        `Found service response DTOs in incorrect locations: ${violations.join(', ')}`,
      );
    }
  });
});
