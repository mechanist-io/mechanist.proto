import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmailOrPhone } from 'src/base/validations/is-email-or-phone.validation';

export class SendIdentifierRequestRestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmailOrPhone()
  identifier!: string;
}
