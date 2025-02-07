import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { UserRepository } from '../repositories/user.repository';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: UserRepository,
          useValue: {
            addFavorite: jest.fn(),
            findAllFavorites: jest.fn(),
            removeFavorite: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
