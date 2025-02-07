import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';
import { ReviewRepository } from '../repositories/review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewInterface } from '../interfaces/review.interface';
import { PharmacyService } from '../pharmacies/pharmacy.service';
import { UserService } from '../auth/user.service';

@Injectable()
export class ReviewService {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly pharmacyService: PharmacyService,
        private readonly userService: UserService,
    ) {}

    async createReview(userId: string, createReviewDto: CreateReviewDto): Promise<ReviewInterface> {
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }

        const userProfile = await this.userService.getUserProfile(userId);
        if (!userProfile) {
            throw new NotFoundException('User not found');
        }

        const pharmacy = await this.pharmacyService.getPharmacyById(createReviewDto.pharmacyId);
        if (!pharmacy) {
            throw new NotFoundException('Pharmacy not found');
        }

        const reviewData: Omit<ReviewInterface, 'id'> = {
            userId,
            userName: userProfile.name,
            pharmacyId: createReviewDto.pharmacyId,
            rating: createReviewDto.rating,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        };

        if (createReviewDto.comment?.trim()) {
            reviewData.comment = createReviewDto.comment.trim();
        }

        const id = await this.reviewRepository.create(reviewData);
        return { ...reviewData, id };
    }

    async getPharmacyReviews(pharmacyId: string): Promise<ReviewInterface[]> {
        const reviews = await this.reviewRepository.findAll();
        return reviews.filter(review => review.pharmacyId === pharmacyId);
    }

    async getUserReviews(userId: string): Promise<ReviewInterface[]> {
        const reviews = await this.reviewRepository.findAll();
        return reviews.filter(review => review.userId === userId);
    }

    async deleteReview(userId: string, reviewId: string): Promise<void> {
        const review = await this.reviewRepository.findById(reviewId);

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        if (review.userId !== userId) {
            throw new BadRequestException('You can only delete your own reviews');
        }

        await this.reviewRepository.delete(reviewId);
    }
} 