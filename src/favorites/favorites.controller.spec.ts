import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { UserRepository } from '../repositories/user.repository';

describe('FavoritesController', () => {
  let controller: FavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
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

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
