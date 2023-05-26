import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nome do contato',
    default: 'Contato',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Sobrenome do contato',
    default: 'Contato Sobrenome',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Email do contato',
    default: 'contact@example.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  main_email: string;

  @ApiProperty({
    description: 'Telefone do contato',
    default: '11999999999',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  main_phone: string;
}
