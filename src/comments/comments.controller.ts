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
import { CommentsService } from './comments.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentV1Dto } from './dto/create-comment.dto';
import { CommentResponseV1Dto } from './dto/comment-response.dto';
import { UpdateCommentV1Dto } from './dto/update-comment.dto';
import { CommentIdParamsV1Dto } from './dto/comment-id-param.dto';

@ApiBearerAuth()
@ApiTags('Comments V1')
@Controller({ version: '1', path: 'comments' })
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/post/:id')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'When comments are fetched as successfully',
    type: [CommentResponseV1Dto],
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Post id',
    required: true,
  })
  async getLatestPostComments(
    @Param() params: CommentIdParamsV1Dto,
    @Query() { limit, skip },
  ) {
    return this.commentsService.findLatestPostComments(params.id, limit, skip);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateCommentV1Dto })
  @ApiCreatedResponse({
    description: 'When comment is created as successfully',
    type: CommentResponseV1Dto,
  })
  @ApiBadRequestResponse({
    description: 'When validation fails',
  })
  async create(@Body() createCommentBody: CreateCommentV1Dto) {
    return this.commentsService.create(createCommentBody);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBody({ type: UpdateCommentV1Dto })
  @ApiCreatedResponse({
    description: 'When comment is updated as successfully',
    type: CommentResponseV1Dto,
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
  async update(
    @Body() updateCommentBody: UpdateCommentV1Dto,
    @Req() request: Request,
    @Param() params: CommentIdParamsV1Dto,
  ) {
    const userId = request['user']['sub'];
    return this.commentsService.update(updateCommentBody, params.id, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiCreatedResponse({
    description: 'When comment is deleted as successfully',
  })
  @ApiBadRequestResponse({
    description: 'When validation fails or comment does not exists',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment id',
    required: true,
  })
  async delete(@Param() params: CommentIdParamsV1Dto, @Req() request: Request) {
    const userId = request['user']['sub'];
    return this.commentsService.delete(params.id, userId);
  }
}
