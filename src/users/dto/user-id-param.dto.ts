import { IsNotEmpty } from 'class-validator';

export class UserIdParamsV1Dto {
  @IsNotEmpty()
  id: string;
}
