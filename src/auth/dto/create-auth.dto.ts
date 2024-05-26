import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthV1Dto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User login.' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User password.' })
  password: string;
}
