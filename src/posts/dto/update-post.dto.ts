import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostV1Dto {
  @IsString()
  @ApiProperty({ description: 'Post content' })
  content: string;
}
