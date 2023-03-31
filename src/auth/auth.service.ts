import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import SignUpDto from '../common/dto/SignUpDto';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user === null) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async signup(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findOne(signUpDto.username);
    if (existingUser !== null) {
      throw new HttpException('Username not available', HttpStatus.CONFLICT);
    }

    try {
      await this.usersService.createOne(signUpDto.username, signUpDto.password);

      return { message: 'User created successfully' };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Could not create new user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
