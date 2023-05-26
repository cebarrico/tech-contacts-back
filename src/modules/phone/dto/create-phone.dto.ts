import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreatePhoneDto {
  @ApiProperty({
    description: 'Telefone adcional',
    default: '11999999999',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phone: string;

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
