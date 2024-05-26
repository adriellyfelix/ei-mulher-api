import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostV1Dto } from './dto/create-post.dto';
import { PostResponseV1Dto } from './dto/post-response.dto';
import { UpdatePostV1Dto } from './dto/update-post.dto';
import { PostIdParamsV1Dto } from './dto/post-id-param.dto';

@ApiBearerAuth()
@ApiTags('Posts V1')
@Controller({ version: '1', path: 'posts' })
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'When posts are fetched as successfully',
    type: [PostResponseV1Dto],
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  async getLatestPosts(@Query() { limit, skip }, @Req() request: Request) {
    const userId = request['user']['sub'];
    return this.postsService.findLatestPosts(userId, limit, skip);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreatePostV1Dto })
  @ApiCreatedResponse({
    description: 'When post is created as successfully',
    type: PostResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When validation fails',
  })
  async create(
    @Body() createPostBody: CreatePostV1Dto,
    @Req() request: Request,
  ) {
    const userId = request['user']['sub'];
    return this.postsService.create(createPostBody, userId);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBody({ type: UpdatePostV1Dto })
  @ApiCreatedResponse({
    description: 'When post is updated as successfully',
    type: PostResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When validation fails',
  })
  async update(
    @Body() updatePostBody: UpdatePostV1Dto,
    @Req() request: Request,
    @Param() params: PostIdParamsV1Dto,
  ) {
    const userId = request['user']['sub'];
    return this.postsService.update(updatePostBody, params.id, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiCreatedResponse({
    description: 'When post is deleted as successfully',
  })
  @ApiBadRequestResponse({
    description: 'When validation fails or post does not exists',
  })
  async delete(@Param() params: PostIdParamsV1Dto, @Req() request: Request) {
    const userId = request['user']['sub'];
    return this.postsService.delete(params.id, userId);
  }
}
