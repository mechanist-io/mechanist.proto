import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '../config-module/config.service';
import { AuthService } from './services/auth.service';

// TODO: algo-boilerplate -> add your auth module here
@Module({
  imports: [
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => {
    //     const config = configService.getConfigs().auth;
    //     const secret = config.JWT_ACCESS_TOKEN_SECRET;
    //     const expiresIn = config.JWT_ACCESS_TOKEN_EXPIRE_SEC;
    //     return { secret, signOptions: { expiresIn } };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
