import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Protected(): PropertyDecorator {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
}
