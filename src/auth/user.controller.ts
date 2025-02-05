import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResetDto } from './dto/reset.dto';
import { ForgotDto } from './dto/forgot.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto) {
    return this.userService.verify(verifyDto);
  }

  @Post('forgot')
  async forgotPassword(@Body() ForgotDto: ForgotDto) {
    return this.userService.forgotPassword(ForgotDto);
  }

  @Post('reset')
  async resetPassword(@Body() ResetDto: ResetDto) {
    return this.userService.resetPassword(ResetDto);
  }

  @Post('resend')
  async resendCode(@Body() ForgotDto: ForgotDto) {
    return this.userService.resendCode(ForgotDto);
  }

  @Post('new-password')
  async newPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.userService.newPassword(newPasswordDto);
  }
}
