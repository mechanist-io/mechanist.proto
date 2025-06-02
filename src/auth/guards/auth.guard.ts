import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Logger } from 'src/base/common/logger';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { AuthUnauthorizedClientException } from '../exceptions/client/unauthorized.client.exception';
import { IRequest } from '../interfaces/request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor() {} // private readonly sessionService: SessionService, // private readonly jwtService: JwtTokenService,

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: IRequest = context.switchToHttp().getRequest();

      const accessTokenResult = await this.handleAccessToken(request);
      if (accessTokenResult) {
        request.user = accessTokenResult;
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
    throw new AuthUnauthorizedClientException({
      message: 'Invalid or expired authentication token.',
    });
  }

  private async handleAccessToken(
    request: IRequest,
  ): Promise<JwtPayloadInterface | null> {
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new Error('No access token found');
      }
      request.token = token;

      // TODO: algo-boilerplate -> add your access token validation here

      // validate access token
      // const jwtPayload = await this.jwtService.verifyToken({
      //   token,
      //   isRefreshToken: false,
      // });
      // // validate session
      // const { sessionId, refreshCounter } = jwtPayload;
      // await this.sessionService.validate({ sessionId, refreshCounter });
      // return jwtPayload ?? null;
      return new Promise((resolve) => {
        resolve(null);
      });
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

  private extractTokenFromHeader(request: IRequest): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
