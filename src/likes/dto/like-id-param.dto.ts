import { IsNotEmpty } from 'class-validator';

export class LikeIdParamsV1Dto {
  @IsNotEmpty()
  id: string;
}
