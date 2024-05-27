import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './like.schema';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async findLikesByContentId(id: string): Promise<Like[]> {
    return this.likeModel.find({ $or: [{ postId: id }, { commentId: id }] });
  }

  async findLike(userId: string, id: string): Promise<Like | null> {
    return this.likeModel.findOne({
      userId,
      $or: [{ postId: id }, { commentId: id }],
    });
  }

  async createCommentLike(userId: string, commentId: string): Promise<Like> {
    const likeExists = await this.findLike(userId, commentId);

    if (likeExists) {
      return likeExists;
    }

    const createdLike = new this.likeModel({
      userId,
      commentId,
      createdAt: new Date(),
    });

    return createdLike.save();
  }

  async createPostLike(userId: string, postId: string): Promise<Like> {
    const likeExists = await this.findLike(userId, postId);

    if (likeExists) {
      return likeExists;
    }

    const createdLike = new this.likeModel({
      userId,
      postId,
      createdAt: new Date(),
    });

    return createdLike.save();
  }

  async deleteLike(userId: string, _id: string): Promise<Like> {
    return this.likeModel.findOneAndDelete({
      userId,
      _id,
    });
  }
}
