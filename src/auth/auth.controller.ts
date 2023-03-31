import {
  Request,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import SignUpDto from '../common/dto/SignUpDto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../core/guards/local-auth.guard';

import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: any) {
    return req.user;
  }
}
