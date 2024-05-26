import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLikeV1Dto {
  @IsString()
  @ApiProperty({ description: 'Like content' })
  content: string;

  @IsString()
  @ApiProperty({ description: 'Like post id' })
  postId: string;

  @IsString()
  @ApiProperty({ description: 'Like author' })
  userId: string;
}
