import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config-module/config.service';
import { UserModule } from '../user/user.module';
import { SessionEntity } from './entities/session.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService, JwtTokenService, SessionService } from './services';
import { SessionController } from './controllers/session.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.getConfigs().auth;
        const secret = config.JWT_ACCESS_TOKEN_SECRET;
        const expiresIn = config.JWT_ACCESS_TOKEN_EXPIRE_SEC;

        return { secret, signOptions: { expiresIn } };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([SessionEntity]),
    UserModule,
  ],
  controllers: [AuthController, SessionController],
  providers: [AuthService, JwtTokenService, SessionService],
  exports: [JwtTokenService, SessionService, AuthService],
})
export class AuthModule {}
