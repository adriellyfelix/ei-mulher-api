import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserV1Dto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserBody: CreateUserV1Dto): Promise<User> {
    const userExists = await this.findByEmail(createUserBody.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserBody.password,
      parseInt(process.env.ENCRYPTION_ROUNDS),
    );

    createUserBody.password = hashedPassword;

    let createdUser = await new this.userModel({
      ...createUserBody,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save();

    createdUser = createdUser.toObject();
    delete createdUser.password;

    return createdUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async getProfile(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password');
  }
}
