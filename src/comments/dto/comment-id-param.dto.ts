import { IsNotEmpty } from 'class-validator';

export class CommentIdParamsV1Dto {
  @IsNotEmpty()
  id: string;
}
