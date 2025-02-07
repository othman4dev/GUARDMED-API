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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const review_repository_1 = require("../repositories/review.repository");
const pharmacy_service_1 = require("../pharmacies/pharmacy.service");
const user_service_1 = require("../auth/user.service");
let ReviewService = class ReviewService {
    constructor(reviewRepository, pharmacyService, userService) {
        this.reviewRepository = reviewRepository;
        this.pharmacyService = pharmacyService;
        this.userService = userService;
    }
    async createReview(userId, createReviewDto) {
        if (!userId) {
            throw new common_1.BadRequestException('User ID is required');
        }
        const userProfile = await this.userService.getUserProfile(userId);
        if (!userProfile) {
            throw new common_1.NotFoundException('User not found');
        }
        const pharmacy = await this.pharmacyService.getPharmacyById(createReviewDto.pharmacyId);
        if (!pharmacy) {
            throw new common_1.NotFoundException('Pharmacy not found');
        }
        const reviewData = {
            userId,
            userName: userProfile.name,
            pharmacyId: createReviewDto.pharmacyId,
            rating: createReviewDto.rating,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp()
        };
        if (createReviewDto.comment?.trim()) {
            reviewData.comment = createReviewDto.comment.trim();
        }
        const id = await this.reviewRepository.create(reviewData);
        return { ...reviewData, id };
    }
    async getPharmacyReviews(pharmacyId) {
        const reviews = await this.reviewRepository.findAll();
        return reviews.filter(review => review.pharmacyId === pharmacyId);
    }
    async getUserReviews(userId) {
        const reviews = await this.reviewRepository.findAll();
        return reviews.filter(review => review.userId === userId);
    }
    async deleteReview(userId, reviewId) {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.userId !== userId) {
            throw new common_1.BadRequestException('You can only delete your own reviews');
        }
        await this.reviewRepository.delete(reviewId);
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        pharmacy_service_1.PharmacyService,
        user_service_1.UserService])
], ReviewService);
//# sourceMappingURL=review.service.js.map