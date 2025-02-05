import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @Min(100000)
  @Max(999999)
  code: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
