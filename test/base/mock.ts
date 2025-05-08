import { faker } from '@faker-js/faker';
import { FileService } from 'src/file/services/file.service';
import { Logger } from '../../src/base/common/logger';

export function mockLogger() {
  jest.spyOn(Logger.prototype, 'log').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'error').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'warn').mockImplementation(async () => {});

  jest.spyOn(Logger.prototype, 'debug').mockImplementation(async () => {});
}


export function mockFileService() {
  const presignedUrl = jest
    .spyOn(FileService.prototype, 'createS3PresignedUploadUrl')
    .mockImplementation(async value => {
      return {
        url: 'https://s3.amazonaws.com/bucket',
        fields: {
          key: value.key,
          acl: 'public-read',
          'Content-Type': value.mimeType,
        },
      };
    });

  const deleteFile = jest
    .spyOn(FileService.prototype, 'deleteS3File')
    .mockImplementation(async () => {
      return;
    });

  return {
    presignedUrl,
    deleteFile,
  };
}

export function mockAll() {
  mockLogger();
  const fileService = mockFileService();
  return {
    fileService,
  };
}

export function resetAdditionalMocks() {
  jest.clearAllMocks();
  return mockAll();
}
