import { ApiProperty } from '@nestjs/swagger';

export class LikeResponseV1Dto {
  @ApiProperty({ description: 'Like id' })
  _id: string;

  @ApiProperty({ description: 'Like comment id' })
  commentId: string;

  @ApiProperty({ description: 'Like post id' })
  postId: string;

  @ApiProperty({ description: 'Like author' })
  userId: string;

  @ApiProperty({ description: 'Like creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Like update date' })
  updatedAt: Date;
}
