import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  const mockReview = {
    id: '1',
    userId: 'user123',
    userName: 'John Doe',
    pharmacyId: 'pharmacy123',
    rating: 5,
    comment: 'Great service',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            createReview: jest.fn().mockResolvedValue(mockReview),
            getPharmacyReviews: jest.fn().mockResolvedValue([mockReview]),
            getUserReviews: jest.fn().mockResolvedValue([mockReview]),
            deleteReview: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        pharmacyId: 'pharmacy123',
        rating: 5,
        comment: 'Great service',
      };

      const req = { user: { userId: 'user123' } };

      const result = await controller.createReview(req, createReviewDto);

      expect(service.createReview).toHaveBeenCalledWith('user123', createReviewDto);
      expect(result).toBeDefined();
      expect(result.id).toBe(mockReview.id);
    });
  });

  describe('getPharmacyReviews', () => {
    it('should return reviews for a pharmacy', async () => {
      const result = await controller.getPharmacyReviews('pharmacy123');

      expect(service.getPharmacyReviews).toHaveBeenCalledWith('pharmacy123');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockReview.id);
    });
  });

  describe('getUserReviews', () => {
    it('should return reviews for a user', async () => {
      const req = { user: { userId: 'user123' } };

      const result = await controller.getUserReviews(req);

      expect(service.getUserReviews).toHaveBeenCalledWith('user123');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockReview.id);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', async () => {
      const req = { user: { userId: 'user123' } };

      await controller.deleteReview(req, '1');

      expect(service.deleteReview).toHaveBeenCalledWith('user123', '1');
    });
  });
}); 