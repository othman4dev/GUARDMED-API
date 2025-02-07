import { Controller, Post, Body, UseGuards, Request, Get, Put, Delete, UseInterceptors, UploadedFile, UploadedFiles, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

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

  @Post('reset')
  async resetPassword(@Body() code: number, email: string) {
    return this.userService.resetPassword(code, email);
  }

  @Post('new-password')
  async newPassword(@Body() password: string, email: string) {
    return this.userService.newPassword(password, email);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    if (process.env.NODE_ENV !== 'test') {
      console.log('User from request:', req.user);
    }
    if (!req.user?.userId) {
      throw new Error('User ID is missing from request');
    }
    return this.userService.getUserProfile(req.user.userId);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'bannerPicture', maxCount: 1 },
    ])
  )
  async updateProfile(
    @Request() req,
    @UploadedFiles() files: { 
      profilePicture?: Express.Multer.File[], 
      bannerPicture?: Express.Multer.File[] 
    },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Full request headers:', req.headers);
      console.log('Authorization header:', req.headers.authorization);
      console.log('User from request:', req.user);
    }
    
    if (!req.headers.authorization) {
      throw new UnauthorizedException('No authorization token provided');
    }

    if (!req.user || !req.user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.userService.updateUserProfile(
      req.user.userId,
      updateUserDto,
      files?.profilePicture?.[0],
      files?.bannerPicture?.[0],
    );
  }

  @Delete('profile')
  @UseGuards(AuthGuard('jwt'))
  async deleteProfile(@Request() req) {
    return this.userService.deleteUserProfile(req.user.userId);
  }
}
