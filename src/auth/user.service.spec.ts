import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { StorageService } from '../storage/storage.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword123',
    role: 'user',
    verified: true,
    favorites: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendUserConfirmation: jest.fn(),
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(userRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      await expect(service.login({ email: 'wrong@email.com', password: 'test' }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
        role: 'user',
        verified: false,
        favourite: ['somePharmacyId'] as [string],
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockResolvedValue('newUserId');

      const result = await service.register(registerDto);

      expect(result).toBeDefined();
      expect(result.userId).toBeDefined();
    });

    it('should throw BadRequestException if email already exists', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);

      await expect(service.register({ 
        name: 'Test', 
        email: 'test@example.com', 
        password: 'test',
        role: 'user',
        verified: false,
        favourite: ['somePharmacyId'] as [string],
      }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile successfully', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);

      const result = await service.getUserProfile('user123');

      expect(result).toBeDefined();
      expect(result.id).toBe(mockUser.id);
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.getUserProfile('nonexistent'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('deleteUserProfile', () => {
    it('should delete user profile successfully', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'delete').mockResolvedValue();

      const result = await service.deleteUserProfile('user123');

      expect(result).toBeDefined();
      expect(result.message).toBe('Profile deleted successfully');
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.deleteUserProfile('nonexistent'))
        .rejects
        .toThrow(NotFoundException);
    });
  });
}); 