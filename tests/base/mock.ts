import { Logger } from '../../src/base/common/logger';

export function mockLogger() {
  jest.spyOn(Logger.prototype, 'log').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'error').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'warn').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'debug').mockImplementation(async () => {});
}

export function mockAll() {
  mockLogger();
  return {};
}

export function resetAdditionalMocks() {
  jest.clearAllMocks();
  return mockAll();
}
