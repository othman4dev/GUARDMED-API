"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const firestore_module_1 = require("./firestore/firestore.module");
const config_1 = require("@nestjs/config");
const user_repository_1 = require("./repositories/user.repository");
const pharmacy_repository_1 = require("./repositories/pharmacy.repository");
const review_repository_1 = require("./repositories/review.repository");
const favorites_module_1 = require("./favorites/favorites.module");
const user_module_1 = require("./auth/user.module");
const mail_module_1 = require("./mail/mail.module");
const pharmacy_module_1 = require("./pharmacies/pharmacy.module");
const review_module_1 = require("./reviews/review.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            firestore_module_1.FirestoreModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            favorites_module_1.FavoritesModule,
            user_module_1.UserModule,
            mail_module_1.MailModule,
            pharmacy_module_1.PharmacyModule,
            review_module_1.ReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, user_repository_1.UserRepository, pharmacy_repository_1.PharmacyRepository, review_repository_1.ReviewRepository],
        exports: [user_repository_1.UserRepository, pharmacy_repository_1.PharmacyRepository, review_repository_1.ReviewRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map