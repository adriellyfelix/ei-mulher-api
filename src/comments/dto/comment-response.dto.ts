import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseV1Dto {
  @ApiProperty({ description: 'Comment id' })
  _id: string;

  @ApiProperty({ description: 'Comment content' })
  content: string;

  @ApiProperty({ description: 'Comment post id' })
  postId: string;

  @ApiProperty({ description: 'Comment author' })
  userId: string;

  @ApiProperty({ description: 'Comment creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Comment update date' })
  updatedAt: Date;
}
