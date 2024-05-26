import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateAuthV1Dto } from './dto/create-auth.dto';
import { CreateAuthResponseV1Dto } from './dto/create-auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(body: CreateAuthV1Dto): Promise<CreateAuthResponseV1Dto> {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new BadRequestException();
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException();
    }

    const payload = {
      username: user.email,
      sub: user._id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
