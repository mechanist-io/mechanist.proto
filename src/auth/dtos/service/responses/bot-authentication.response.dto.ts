import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { UserEntity } from 'src/user/entities/user.entity';

export class BotAuthenticationResponseDto {
  user: UserEntity;
  jwtPayload: JwtPayloadInterface;
  auth: {
    accessToken: string;
    refreshToken: string;
  };
}
