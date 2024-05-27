import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LikeResponseV1Dto } from './dto/like-response.dto';
import { CommentIdParamsV1Dto } from 'src/comments/dto/comment-id-param.dto';
import { LikeIdParamsV1Dto } from './dto/like-id-param.dto';
import { PostIdParamsV1Dto } from 'src/posts/dto/post-id-param.dto';

@ApiBearerAuth()
@ApiTags('Likes V1')
@Controller({ version: '1', path: 'likes' })
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('/post/:id')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'When likes are fetched as successfully',
    type: [LikeResponseV1Dto],
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Post id',
    required: true,
  })
  async getLikesByPostId(@Param() params: PostIdParamsV1Dto) {
    return this.likesService.findLikesByContentId(params.id);
  }

  @Get('/comment/:id')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'When likes are fetched as successfully',
    type: [LikeResponseV1Dto],
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment id',
    required: true,
  })
  async getLikesByCommentId(@Param() params: CommentIdParamsV1Dto) {
    return this.likesService.findLikesByContentId(params.id);
  }

  @Post('/comment/:id')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'When like is created as successfully',
    type: LikeResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When validation fails',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment id',
    required: true,
  })
  async createCommentLike(
    @Req() request: Request,
    @Param() params: CommentIdParamsV1Dto,
  ) {
    const userId = request['user']['sub'];
    return this.likesService.createCommentLike(userId, params.id);
  }

  @Post('/post/:id')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'When like is created as successfully',
    type: LikeResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When validation fails',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Post id',
    required: true,
  })
  async createPostLike(
    @Req() request: Request,
    @Param() params: PostIdParamsV1Dto,
  ) {
    const userId = request['user']['sub'];
    return this.likesService.createPostLike(userId, params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiCreatedResponse({
    description: 'When like is deleted as successfully',
  })
  @ApiBadRequestResponse({
    description: 'When validation fails or like does not exists',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Like id',
    required: true,
  })
  async delete(@Param() params: LikeIdParamsV1Dto, @Req() request: Request) {
    const userId = request['user']['sub'];
    return this.likesService.deleteLike(userId, params.id);
  }
}
