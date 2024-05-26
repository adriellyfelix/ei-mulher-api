import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserV1Dto } from './dto/create-user.dto';
import { CreateUserResponseV1Dto } from './dto/create-user-response.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users V1')
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateUserV1Dto })
  @ApiCreatedResponse({
    description: 'When user is created as successfully',
    type: CreateUserResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When e-mail does exists',
  })
  @Public()
  async create(@Body() createUserBody: CreateUserV1Dto) {
    return this.usersService.create(createUserBody);
  }
}
