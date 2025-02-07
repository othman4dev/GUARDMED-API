import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    verified: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'token', role: 'user', userId: 'user123' }),
            register: jest.fn().mockResolvedValue({ userId: 'user123', email: 'test@example.com' }),
            verify: jest.fn().mockResolvedValue({ message: 'User verified', status: 200 }),
            resetPassword: jest.fn().mockResolvedValue(true),
            newPassword: jest.fn().mockResolvedValue(true),
            getUserProfile: jest.fn().mockResolvedValue(mockUser),
            updateUserProfile: jest.fn().mockResolvedValue(mockUser),
            deleteUserProfile: jest.fn().mockResolvedValue({ message: 'Profile deleted successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.login(loginDto);

      expect(service.login).toHaveBeenCalledWith(loginDto);
      expect(result.access_token).toBeDefined();
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const registerDto: RegisterDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        verified: false,
        favourite: ['somePharmacyId'] as [string],
      };

      const result = await controller.register(registerDto);

      expect(service.register).toHaveBeenCalledWith(registerDto);
      expect(result.userId).toBeDefined();
    });
  });

  describe('getProfile', () => {
    it('should get user profile', async () => {
      const req = { user: { userId: 'user123' } };

      const result = await controller.getProfile(req);

      expect(service.getUserProfile).toHaveBeenCalledWith('user123');
      expect(result).toEqual(mockUser);
    });

    it('should throw error if userId is missing', async () => {
      const req = { user: {} };

      await expect(controller.getProfile(req))
        .rejects
        .toThrow('User ID is missing from request');
    });
  });

  describe('updateProfile', () => {
    it('should throw UnauthorizedException when no token provided', async () => {
      const req = { headers: {} };
      const files = {};
      const updateDto = {};

      await expect(controller.updateProfile(req, files, updateDto))
        .rejects
        .toThrow(UnauthorizedException);
    });

    it('should update profile successfully', async () => {
      const req = {
        headers: { authorization: 'Bearer token' },
        user: { userId: 'user123' }
      };
      const files = {};
      const updateDto = { name: 'Updated Name' };

      const result = await controller.updateProfile(req, files, updateDto);

      expect(service.updateUserProfile).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteProfile', () => {
    it('should delete profile successfully', async () => {
      const req = { user: { userId: 'user123' } };

      const result = await controller.deleteProfile(req);

      expect(service.deleteUserProfile).toHaveBeenCalledWith('user123');
      expect(result.message).toBe('Profile deleted successfully');
    });
  });
}); 