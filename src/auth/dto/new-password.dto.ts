import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
