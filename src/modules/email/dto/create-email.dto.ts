import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contactId: string;
}
