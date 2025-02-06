import { ReviewRepository } from '../repositories/review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewInterface } from '../interfaces/review.interface';
import { PharmacyService } from '../pharmacies/pharmacy.service';
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly pharmacyService;
    constructor(reviewRepository: ReviewRepository, pharmacyService: PharmacyService);
    createReview(userId: string, createReviewDto: CreateReviewDto): Promise<ReviewInterface>;
    getPharmacyReviews(pharmacyId: string): Promise<ReviewInterface[]>;
    getUserReviews(userId: string): Promise<ReviewInterface[]>;
    deleteReview(userId: string, reviewId: string): Promise<void>;
}
