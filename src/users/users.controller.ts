import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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

  @Get('profile')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'When user profile is fetched as successfully',
    type: CreateUserResponseV1Dto,
  })
  async getProfile(@Req() request: Request) {
    const userId = request['user']['sub'];
    return this.usersService.getProfile(userId);
  }
}
