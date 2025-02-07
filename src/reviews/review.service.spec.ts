import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { ReviewRepository } from '../repositories/review.repository';
import { PharmacyService } from '../pharmacies/pharmacy.service';
import { UserService } from '../auth/user.service';
import { MailService } from '../mail/mail.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';
import { StorageService } from '../storage/storage.service';
import { LocalStorageService } from '../storage/local-storage.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: ReviewRepository;
  let pharmacyService: PharmacyService;
  let userService: UserService;

  const mockFieldValue = {
    _seconds: 1234567890,
    _nanoseconds: 123456789,
  } as unknown as FieldValue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: ReviewRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: PharmacyService,
          useValue: {
            getPharmacyById: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserProfile: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendUserConfirmation: jest.fn(),
            // add other mail methods you use
          },
        },
        {
          provide: StorageService,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            saveFile: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<ReviewRepository>(ReviewRepository);
    pharmacyService = module.get<PharmacyService>(PharmacyService);
    userService = module.get<UserService>(UserService);
  });

  describe('createReview', () => {
    const mockUserId = 'user123';
    const mockUserProfile = {
      id: mockUserId,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      verified: true,
      favorites: [],
    };

    const mockPharmacy = {
      id: 'pharmacy123',
      name: 'New Pharmacy',
      address: '123 Test St',
      phone: '1234567890',
      location: { lat: 0, lng: 0 },
      openingHours: { open_at: '09:00', close_at: '18:00' },
      is_guard: false,
    };

    it('should create a review successfully', async () => {
      const createReviewDto = {
        pharmacyId: 'pharmacy123',
        rating: 5,
        comment: 'Great service',
      };

      jest
        .spyOn(userService, 'getUserProfile')
        .mockResolvedValue(mockUserProfile);
      jest
        .spyOn(pharmacyService, 'getPharmacyById')
        .mockResolvedValue(mockPharmacy);
      jest.spyOn(reviewRepository, 'create').mockResolvedValue('newReviewId');

      const result = await service.createReview(mockUserId, createReviewDto);

      expect(result).toBeDefined();
      expect(result.userId).toBe(mockUserId);
      expect(result.rating).toBe(createReviewDto.rating);
    });

    it('should throw BadRequestException if userId is not provided', async () => {
      await expect(
        service.createReview('', { pharmacyId: 'test', rating: 5 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userService, 'getUserProfile').mockResolvedValue(null);

      await expect(
        service.createReview(mockUserId, { pharmacyId: 'test', rating: 5 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPharmacyReviews', () => {
    it('should return reviews for a specific pharmacy', async () => {
      const mockReviews = [
        {
          id: '1',
          userId: 'user123',
          userName: 'John Doe',
          pharmacyId: 'pharmacy123',
          rating: 5,
          createdAt: mockFieldValue,
          updatedAt: mockFieldValue,
        },
        {
          id: '2',
          userId: 'user456',
          userName: 'Jane Doe',
          pharmacyId: 'pharmacy123',
          rating: 4,
          createdAt: mockFieldValue,
          updatedAt: mockFieldValue,
        },
      ];

      jest.spyOn(reviewRepository, 'findAll').mockResolvedValue(mockReviews);

      const result = await service.getPharmacyReviews('pharmacy123');

      expect(reviewRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(
        mockReviews.filter((review) => review.pharmacyId === 'pharmacy123'),
      );
      expect(result).toHaveLength(2);
      expect(result[0].pharmacyId).toBe('pharmacy123');
    });
  });

  describe('getUserReviews', () => {
    it('should return reviews for a specific user', async () => {
      const mockReviews = [
        {
          id: '1',
          userId: 'user123',
          userName: 'John Doe',
          pharmacyId: 'pharmacy123',
          rating: 5,
          createdAt: mockFieldValue,
          updatedAt: mockFieldValue,
        },
        {
          id: '2',
          userId: 'user123',
          userName: 'John Doe',
          pharmacyId: 'pharmacy456',
          rating: 4,
          createdAt: mockFieldValue,
          updatedAt: mockFieldValue,
        },
      ];

      jest.spyOn(reviewRepository, 'findAll').mockResolvedValue(mockReviews);

      const result = await service.getUserReviews('user123');

      expect(reviewRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(
        mockReviews.filter((review) => review.userId === 'user123'),
      );
      expect(result).toHaveLength(2);
      expect(result[0].userId).toBe('user123');
    });
  });

  describe('deleteReview', () => {
    it('should delete a review successfully', async () => {
      const mockReview = {
        id: 'review123',
        userId: 'user123',
        userName: 'Test User',
        pharmacyId: '456',
        rating: 5,
        createdAt: mockFieldValue,
        updatedAt: mockFieldValue,
      };

      jest.spyOn(reviewRepository, 'findById').mockResolvedValue(mockReview);
      jest.spyOn(reviewRepository, 'delete').mockResolvedValue();

      await expect(
        service.deleteReview('user123', 'review123'),
      ).resolves.not.toThrow();
    });

    it('should throw NotFoundException if review is not found', async () => {
      jest.spyOn(reviewRepository, 'findById').mockResolvedValue(null);

      await expect(
        service.deleteReview('user123', 'review123'),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw BadRequestException if user tries to delete another user's review", async () => {
      const mockReview = {
        id: 'review123',
        userId: 'otherUser123',
        userName: 'Other User',
        pharmacyId: '456',
        rating: 5,
        createdAt: mockFieldValue,
        updatedAt: mockFieldValue,
      };

      jest.spyOn(reviewRepository, 'findById').mockResolvedValue(mockReview);

      await expect(
        service.deleteReview('user123', 'review123'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
