import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  main_email: string;

  @IsString()
  @IsNotEmpty()
  main_phone: string;
}
