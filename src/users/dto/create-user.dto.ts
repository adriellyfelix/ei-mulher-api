import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/validation/match.decorator';
import { LinkV1Dto } from './link.dto';

export class CreateUserV1Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @ApiPropertyOptional({ description: 'User phone number' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ description: 'User password.' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(8)
  @Match('password')
  @ApiProperty({ description: 'User confirm password.' })
  confirmPassword: string;

  @IsString()
  @ApiPropertyOptional({ description: 'User description' })
  description: string;

  @IsArray()
  @ApiPropertyOptional({ description: 'User links', type: [LinkV1Dto] })
  links: LinkV1Dto[];
}
