import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LinkV1Dto {
  @IsString()
  @ApiProperty({ description: 'User source link' })
  source: string;

  @IsString()
  @ApiProperty({ description: 'User url' })
  url: string;
}
