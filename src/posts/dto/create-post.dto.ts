import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostV1Dto {
  @IsString()
  @ApiProperty({ description: 'Post content' })
  content: string;
}
