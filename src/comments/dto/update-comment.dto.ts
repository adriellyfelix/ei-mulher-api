import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentV1Dto {
  @IsString()
  @ApiProperty({ description: 'Comment content' })
  content: string;
}
