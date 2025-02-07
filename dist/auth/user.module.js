"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const mail_module_1 = require("../mail/mail.module");
const storage_module_1 = require("../storage/storage.module");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const local_storage_service_1 = require("../storage/local-storage.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mail_module_1.MailModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule,
                    platform_express_1.MulterModule.register({
                        storage: (0, multer_1.diskStorage)({
                            destination: './uploads',
                            filename: (req, file, cb) => {
                                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
                            },
                        }),
                    }),
                ],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '7d' },
                }),
                inject: [config_1.ConfigService],
            }),
            storage_module_1.StorageModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy, local_storage_service_1.LocalStorageService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map