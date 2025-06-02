import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';

export function Protected(): PropertyDecorator {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
}
