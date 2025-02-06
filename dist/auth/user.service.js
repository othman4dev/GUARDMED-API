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
let UserService = class UserService {
    constructor(userRepository, mailService, jwtService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        if (!user.verified) {
            throw new common_1.UnauthorizedException('User not verified');
        }
        const payload = { username: user.email, sub: user.id };
        return {
            message: 'Login successful',
            role: user.role,
            access_token: this.jwtService.sign(payload),
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
        return { message: 'User created', userId, email: registerDto.email };
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
        return { message: 'User verified', email: user.email, userId: user.id };
    }
    async forgotPassword(ForgotDto) {
        const user = await this.userRepository.findByEmail(ForgotDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
    async resetPassword(ResetDto) {
        const user = await this.userRepository.findByEmail(ResetDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (ResetDto.code !== user.code) {
            throw new common_1.BadRequestException('Invalid code');
        }
        return { message: 'Code verified', email: ResetDto.email };
    }
    async newPassword(newPasswordDto) {
        const user = await this.userRepository.findByEmail(newPasswordDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = await bcrypt.hash(newPasswordDto.password, 10);
        await this.userRepository.update(user.id, { password: hashedPassword });
        return { message: 'Password updated', email: newPasswordDto.email };
    }
    async resendCode(ForgotDto) {
        const user = await this.userRepository.findByEmail(ForgotDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        mail_service_1.MailService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map