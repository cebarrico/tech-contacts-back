import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contactId: string;
}
