"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const verify_dto_1 = require("./dto/verify.dto");
const passport_1 = require("@nestjs/passport");
const update_user_dto_1 = require("./dto/update-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(loginDto) {
        return this.userService.login(loginDto);
    }
    async register(registerDto) {
        return this.userService.register(registerDto);
    }
    async verify(verifyDto) {
        return this.userService.verify(verifyDto);
    }
    async resetPassword(code, email) {
        return this.userService.resetPassword(code, email);
    }
    async newPassword(password, email) {
        return this.userService.newPassword(password, email);
    }
    async getProfile(req) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('User from request:', req.user);
        }
        if (!req.user?.userId) {
            throw new Error('User ID is missing from request');
        }
        return this.userService.getUserProfile(req.user.userId);
    }
    async updateProfile(req, files, updateUserDto) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Full request headers:', req.headers);
            console.log('Authorization header:', req.headers.authorization);
            console.log('User from request:', req.user);
        }
        if (!req.headers.authorization) {
            throw new common_1.UnauthorizedException('No authorization token provided');
        }
        if (!req.user || !req.user.userId) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        return this.userService.updateUserProfile(req.user.userId, updateUserDto, files?.profilePicture?.[0], files?.bannerPicture?.[0]);
    }
    async deleteProfile(req) {
        return this.userService.deleteUserProfile(req.user.userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_dto_1.VerifyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('new-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newPassword", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'bannerPicture', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map