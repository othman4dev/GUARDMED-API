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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const firestore_1 = require("firebase-admin/firestore");
class ReviewResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ReviewResponseDto = ReviewResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "pharmacyId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReviewResponseDto.prototype, "rating", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "comment", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", firestore_1.FieldValue)
], ReviewResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", firestore_1.FieldValue)
], ReviewResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=review-response.dto.js.map