import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateAuthV1Dto } from './dto/create-auth.dto';
import { CreateAuthResponseV1Dto } from './dto/create-auth-response.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth V1')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateAuthV1Dto })
  @ApiCreatedResponse({
    description: 'When session is created as successfully',
    type: CreateAuthResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When user does not exists.',
  })
  @Public()
  create(@Body() createUserV1Dto: CreateAuthV1Dto) {
    return this.authService.authenticate(createUserV1Dto);
  }
}
