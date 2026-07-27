import { Body, Controller, HttpCode, Options, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendIdentifierRequestRestDto } from '../dtos/controller/requests/send-identifier.request.rest.dto';
import { SendIdentifierResponseRestDto } from '../dtos/controller/responses/send-identifier.response.rest.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Options('send-identifier')
  @HttpCode(204)
  sendIdentifierPreflight(): void {}

  @Version('1')
  @Post('send-identifier')
  async sendIdentifier(
    @Body() body: SendIdentifierRequestRestDto,
  ): Promise<SendIdentifierResponseRestDto> {
    await this.authService.sendIdentifierNotification(body.identifier);

    return { sent: true };
  }
}
