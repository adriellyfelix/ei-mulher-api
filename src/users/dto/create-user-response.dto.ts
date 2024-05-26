import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LinkV1Dto } from './link.dto';

export class CreateUserResponseV1Dto {
  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiPropertyOptional({ description: 'User phone number' })
  phone: string;

  @ApiPropertyOptional({ description: 'User description' })
  description: string;

  @ApiPropertyOptional({ description: 'User links', type: [LinkV1Dto] })
  links: LinkV1Dto[];
}
