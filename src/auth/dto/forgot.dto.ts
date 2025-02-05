import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
