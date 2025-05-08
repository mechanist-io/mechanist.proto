/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SetMetadata } from '@nestjs/common';

export const DEVELOPMENT_STATUS_KEY = 'developmentStatus';

export enum DevelopmentStatusEnum {
  STABLE = 'stable',
  BETA = 'beta',
  ALPHA = 'alpha',
  DEPRECATED = 'deprecated',
}

export const DevelopmentStatus = (status: DevelopmentStatusEnum) =>
  SetMetadata(DEVELOPMENT_STATUS_KEY, status);
