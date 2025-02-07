import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { messaging } from 'firebase-admin';
import { StorageService } from '../storage/storage.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import * as fs from 'fs';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly storageService: StorageService,
    private readonly localStorageService: LocalStorageService
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    if (!user.verified) {
      throw new UnauthorizedException('User not verified');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      userId  : user.id,
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      favorites: [],
      role: 'user',
      verified: false,
      code: Math.floor(1000 + Math.random() * 9000),
    };
    const userId = await this.userRepository.create(newUser);
    await this.mailService.sendUserConfirmation(registerDto.email, newUser.code);
    return { userId, email: registerDto.email };
  }

  async verify(verifyDto: VerifyDto) {
    const user = await this.userRepository.findById(verifyDto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.verified) {
      throw new UnauthorizedException('User already verified');
    }
    if (verifyDto.code !== user.code) {
      throw new BadRequestException('Invalid code');
    }

    const updated = await this.userRepository.update(verifyDto.id, {
      verified: true,
    });
    return { message: 'User verified', status: 200 };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await this.userRepository.update(user.id, { code });
    await this.mailService.sendResetPassword(email, code);
    return email;
  }

  async resetPassword(code: number, email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (code !== user.code) {
      throw new BadRequestException('Invalid code');
    }
    return true;
  }

  async newPassword(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(user.id, { password: hashedPassword });
    return true;
  }

  async getUserProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserProfileDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      profilePicture: user.profilePicture,
      bannerPicture: user.bannerPicture,
      bio: user.bio,
      phoneNumber: user.phoneNumber,
      address: user.address,
      favorites: user.favorites
    });
  }

  async updateUserProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
    profilePicture?: Express.Multer.File,
    bannerPicture?: Express.Multer.File,
  ) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updateData: any = { ...updateUserDto };

      // Gérer l'upload de la photo de profil
      if (profilePicture) {
        const profilePath = await this.localStorageService.saveFile(profilePicture, 'profile');
        updateData.profilePicture = profilePath;
      }

      // Gérer l'upload de la bannière
      if (bannerPicture) {
        const bannerPath = await this.localStorageService.saveFile(bannerPicture, 'banner');
        updateData.bannerPicture = bannerPath;
      }

      await this.userRepository.update(userId, updateData);
      return this.userRepository.findById(userId);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async deleteUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.profilePicture) {
      await this.storageService.deleteFile(user.profilePicture);
    }
    if (user.bannerPicture) {
      await this.storageService.deleteFile(user.bannerPicture);
    }

    await this.userRepository.delete(userId);
    return { message: 'Profile deleted successfully' };
  }
}
