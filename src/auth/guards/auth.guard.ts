import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Logger } from 'src/base/common/logger';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { JwtTokenService } from '../services/jwt-token.service';
import { Request } from 'express';
import { SessionService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtTokenService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest() as Request;

      const accessTokenResult = await this.handleAccessToken(request);
      if (accessTokenResult) {
        request['user'] = accessTokenResult;
        return true;
      }
    } catch (error) {
      this.logger.warn(
        {
          message: 'Auth guard error',
          info: {
            error: error instanceof Error ? error.message : error,
          },
        },
        this.canActivate.name,
      );
    }
    throw new UnauthorizedException(`Unauthorized`);
  }

  private async handleAccessToken(
    request: Request,
  ): Promise<JwtPayloadInterface | null> {
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new Error('No access token found');
      }
      request['token'] = token;

      // validate access token
      const jwtPayload = await this.jwtService.verifyToken({
        token,
        isRefreshToken: false,
      });
      // validate session
      const { sessionId, refreshCounter } = jwtPayload;
      await this.sessionService.validate({ sessionId, refreshCounter });
      return jwtPayload ?? null;
    } catch (error) {
      this.logger.warn(
        {
          message: 'Access token error',
          info: {
            error: error instanceof Error ? error.message : error,
          },
        },
        this.handleAccessToken.name,
      );
      return null;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
