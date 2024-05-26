import { BadRequestException, Injectable } from '@nestjs/common';
import { Comment } from './comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateCommentV1Dto } from './dto/update-comment.dto';
import { CreateCommentV1Dto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findLatestPostComments(
    postId: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<Comment[]> {
    return this.commentModel
      .find({ postId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
  }

  async create(createCommentBody: CreateCommentV1Dto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentBody);

    return createdComment.save();
  }

  async update(
    updateCommentBody: UpdateCommentV1Dto,
    _id: string,
    userId: string,
  ): Promise<Comment> {
    const commentExists = await this.commentModel.findOne({ _id, userId });

    if (!commentExists) {
      throw new BadRequestException('Comment not found');
    }

    return this.commentModel.findOneAndUpdate(
      { _id, userId },
      updateCommentBody,
      {
        new: true,
      },
    );
  }

  async delete(_id: string, userId: string): Promise<Comment> {
    const commentExists = await this.commentModel.findOne({ _id, userId });

    if (!commentExists) {
      throw new BadRequestException('Comment not found');
    }

    return this.commentModel.findOneAndDelete({ _id, userId });
  }
}
