"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
const review_repository_1 = require("../repositories/review.repository");
const pharmacy_module_1 = require("../pharmacies/pharmacy.module");
const auth_module_1 = require("../auth/auth.module");
const firestore_module_1 = require("../firestore/firestore.module");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pharmacy_module_1.PharmacyModule,
            auth_module_1.AuthModule,
            firestore_module_1.FirestoreModule,
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService, review_repository_1.ReviewRepository],
        exports: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map