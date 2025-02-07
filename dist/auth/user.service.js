"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const mail_service_1 = require("../mail/mail.service");
const storage_service_1 = require("../storage/storage.service");
const user_profile_dto_1 = require("./dto/user-profile.dto");
const local_storage_service_1 = require("../storage/local-storage.service");
let UserService = class UserService {
    constructor(userRepository, mailService, jwtService, storageService, localStorageService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.storageService = storageService;
        this.localStorageService = localStorageService;
    }
    async login(loginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid password');
        }
        if (!user.verified) {
            throw new common_1.UnauthorizedException('User not verified');
        }
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            role: user.role,
            userId: user.id,
        };
    }
    async register(registerDto) {
        const user = await this.userRepository.findByEmail(registerDto.email);
        if (user) {
            throw new common_1.BadRequestException('User already exists');
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
    async verify(verifyDto) {
        const user = await this.userRepository.findById(verifyDto.id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.verified) {
            throw new common_1.UnauthorizedException('User already verified');
        }
        if (verifyDto.code !== user.code) {
            throw new common_1.BadRequestException('Invalid code');
        }
        const updated = await this.userRepository.update(verifyDto.id, {
            verified: true,
        });
        return { message: 'User verified', status: 200 };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        await this.userRepository.update(user.id, { code });
        await this.mailService.sendResetPassword(email, code);
        return email;
    }
    async resetPassword(code, email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (code !== user.code) {
            throw new common_1.BadRequestException('Invalid code');
        }
        return true;
    }
    async newPassword(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.update(user.id, { password: hashedPassword });
        return true;
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return new user_profile_dto_1.UserProfileDto({
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
    async updateUserProfile(userId, updateUserDto, profilePicture, bannerPicture) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const updateData = { ...updateUserDto };
            if (profilePicture) {
                const profilePath = await this.localStorageService.saveFile(profilePicture, 'profile');
                updateData.profilePicture = profilePath;
            }
            if (bannerPicture) {
                const bannerPath = await this.localStorageService.saveFile(bannerPicture, 'banner');
                updateData.bannerPicture = bannerPath;
            }
            await this.userRepository.update(userId, updateData);
            return this.userRepository.findById(userId);
        }
        catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }
    async deleteUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        mail_service_1.MailService,
        jwt_1.JwtService,
        storage_service_1.StorageService,
        local_storage_service_1.LocalStorageService])
], UserService);
//# sourceMappingURL=user.service.js.map