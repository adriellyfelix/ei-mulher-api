import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentV1Dto {
  @IsString()
  @ApiProperty({ description: 'Comment content' })
  content: string;

  @IsString()
  @ApiProperty({ description: 'Comment post id' })
  postId: string;

  @IsString()
  @ApiProperty({ description: 'Comment author' })
  userId: string;
}
