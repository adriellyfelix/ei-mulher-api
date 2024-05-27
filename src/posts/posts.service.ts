import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostV1Dto } from './dto/create-post.dto';
import { UpdatePostV1Dto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly usersService: UsersService,
  ) {}

  async findLatestPosts(
    userId: string,
    limit: number = 10,
    skip: number = 0,
  ): Promise<Post[]> {
    const user = await this.usersService.findById(userId);

    return this.postModel
      .find({ userId: { $in: [...user.connections, userId] } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
  }

  async create(createPostBody: CreatePostV1Dto, userId: string): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostBody,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createdPost.save();
  }

  async update(
    updatePostBody: UpdatePostV1Dto,
    _id: string,
    userId: string,
  ): Promise<Post> {
    const postExists = await this.postModel.findOne({ _id, userId });

    if (!postExists) {
      throw new BadRequestException('Post not found');
    }

    return this.postModel.findOneAndUpdate(
      { _id, userId },
      { ...updatePostBody, updatedAt: new Date() },
      {
        new: true,
      },
    );
  }

  async delete(_id: string, userId: string): Promise<Post> {
    const postExists = await this.postModel.findOne({ _id, userId });

    if (!postExists) {
      throw new BadRequestException('Post not found');
    }

    return this.postModel.findOneAndDelete({ _id, userId });
  }
}
