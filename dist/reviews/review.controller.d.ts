import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(req: any, createReviewDto: CreateReviewDto): Promise<ReviewResponseDto>;
    getPharmacyReviews(pharmacyId: string): Promise<ReviewResponseDto[]>;
    getUserReviews(req: any): Promise<ReviewResponseDto[]>;
    deleteReview(req: any, id: string): Promise<void>;
}
