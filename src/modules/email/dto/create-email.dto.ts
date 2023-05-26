import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({
    description: 'Email adcional',
    default: 'mail@example.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'ID do usuário se for para ele que ira adcionar o numero',
    default: ':id',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @ApiProperty({
    description: 'ID do contato se for para ele que ira adcionar o numero',
    default: ':id',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contactId: string;
}
