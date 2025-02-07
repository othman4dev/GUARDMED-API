import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { LocalStorageService } from '../storage/local-storage.service';
export declare class UserService {
    private readonly userRepository;
    private readonly mailService;
    private readonly jwtService;
    private readonly storageService;
    private readonly localStorageService;
    constructor(userRepository: UserRepository, mailService: MailService, jwtService: JwtService, storageService: StorageService, localStorageService: LocalStorageService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        role: string;
        userId: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        userId: string;
        email: string;
    }>;
    verify(verifyDto: VerifyDto): Promise<{
        message: string;
        status: number;
    }>;
    forgotPassword(email: string): Promise<string>;
    resetPassword(code: number, email: string): Promise<boolean>;
    newPassword(email: string, password: string): Promise<boolean>;
    getUserProfile(userId: string): Promise<UserProfileDto>;
    updateUserProfile(userId: string, updateUserDto: UpdateUserDto, profilePicture?: Express.Multer.File, bannerPicture?: Express.Multer.File): Promise<any>;
    deleteUserProfile(userId: string): Promise<{
        message: string;
    }>;
}
