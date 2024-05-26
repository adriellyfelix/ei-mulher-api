import { ApiProperty } from '@nestjs/swagger';

export class PostResponseV1Dto {
  @ApiProperty({ description: 'Post id' })
  _id: string;

  @ApiProperty({ description: 'Post content' })
  content: string;

  @ApiProperty({ description: 'Post author' })
  userId: string;

  @ApiProperty({ description: 'Post creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Post update date' })
  updatedAt: Date;
}
