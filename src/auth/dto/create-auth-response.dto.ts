import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthResponseV1Dto {
  @ApiPropertyOptional({ description: 'Authentication token.' })
  access_token: string;
}
