import { IsNotEmpty } from 'class-validator';

export class PostIdParamsV1Dto {
  @IsNotEmpty()
  id: string;
}
