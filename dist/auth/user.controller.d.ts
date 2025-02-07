import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    resetPassword(code: number, email: string): Promise<boolean>;
    newPassword(password: string, email: string): Promise<boolean>;
    getProfile(req: any): Promise<import("./dto/user-profile.dto").UserProfileDto>;
    updateProfile(req: any, files: {
        profilePicture?: Express.Multer.File[];
        bannerPicture?: Express.Multer.File[];
    }, updateUserDto: UpdateUserDto): Promise<any>;
    deleteProfile(req: any): Promise<{
        message: string;
    }>;
}
