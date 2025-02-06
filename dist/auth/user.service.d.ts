import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ResetDto } from './dto/reset.dto';
import { ForgotDto } from './dto/forgot.dto';
import { NewPasswordDto } from './dto/new-password.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly mailService;
    private readonly jwtService;
    constructor(userRepository: UserRepository, mailService: MailService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        role: string;
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    verify(verifyDto: VerifyDto): Promise<{
        message: string;
        email: string;
        userId: string;
    }>;
    forgotPassword(ForgotDto: ForgotDto): Promise<{
        message: string;
        email: string;
        userId: string;
    }>;
    resetPassword(ResetDto: ResetDto): Promise<{
        message: string;
        email: string;
    }>;
    newPassword(newPasswordDto: NewPasswordDto): Promise<{
        message: string;
        email: string;
    }>;
    resendCode(ForgotDto: ForgotDto): Promise<{
        message: string;
        email: string;
        userId: string;
    }>;
}
