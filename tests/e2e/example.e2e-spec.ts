import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mockAll, resetAdditionalMocks } from '../base/mock';
import {
  cleanUpDatabaseAndReSeed,
  getSharedApp,
  tearDownTest,
} from '../base/test.utils';

jest.setTimeout(30000);
describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mock = mockAll();

  beforeAll(async () => {
    app = await getSharedApp();
  });

  beforeEach(async () => {
    await cleanUpDatabaseAndReSeed(app);
    mock = resetAdditionalMocks();
  });

  afterAll(async () => {
    await tearDownTest(app);
  });

  it('test health check: /api/v1/health (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);
    expect(response.status).toBe(200);
    expect(mock.fileService.deleteFile).not.toHaveBeenCalled();
  });
});
