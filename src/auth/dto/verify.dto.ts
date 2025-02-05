import { IsNumber, Min, Max, IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  id: string;

  @IsNumber()
  @Min(1000)
  @Max(9999)
  code: number;
}
