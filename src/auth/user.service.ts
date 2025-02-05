import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { ResetDto } from './dto/reset.dto';
import { ForgotDto } from './dto/forgot.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
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
      throw new BadRequestException('Invalid email or password');
    }
    if (!user.verified) {
      throw new UnauthorizedException('User not verified');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      message: 'Login successful',
      role: user.role,
      access_token: this.jwtService.sign(payload),
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

    // Send verification email
    await this.mailService.sendUserConfirmation(
      registerDto.email,
      newUser.code,
    );

    return { message: 'User created', userId, email: registerDto.email };
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

    return { message: 'User verified', email: user.email, userId: user.id };
  }

  async forgotPassword(ForgotDto: ForgotDto) {
    const user = await this.userRepository.findByEmail(ForgotDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    await this.userRepository.update(user.id, { code });
    await this.mailService.sendResetPassword(ForgotDto.email, code);
    return {
      message: 'Code sent to email',
      email: ForgotDto.email,
      userId: user.id,
    };
  }

  async resetPassword(ResetDto: ResetDto) {
    const user = await this.userRepository.findByEmail(ResetDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (ResetDto.code !== user.code) {
      throw new BadRequestException('Invalid code');
    }
    return { message: 'Code verified', email: ResetDto.email };
  }

  async newPassword(newPasswordDto: NewPasswordDto) {
    const user = await this.userRepository.findByEmail(newPasswordDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPasswordDto.password, 10);
    await this.userRepository.update(user.id, { password: hashedPassword });
    return { message: 'Password updated', email: newPasswordDto.email };
  }

  async resendCode(ForgotDto: ForgotDto) {
    const user = await this.userRepository.findByEmail(ForgotDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    await this.userRepository.update(user.id, { code: code });
    await this.mailService.sendUserConfirmation(ForgotDto.email, code);
    return {
      message: 'Code sent to email',
      email: ForgotDto.email,
      userId: user.id,
    };
  }
}
