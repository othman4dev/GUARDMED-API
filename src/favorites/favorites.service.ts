import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly userRepository: UserRepository) {}

  create(userId: string, createFavoriteDto: CreateFavoriteDto) {
    return this.userRepository.addFavorite(
      userId,
      createFavoriteDto.pharmacyId,
    );
  }

  async findAll(userId: string) {
    return this.userRepository.findAllFavorites(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(userId: string, pharmacyId: string) {
    return this.userRepository.removeFavorite(userId, pharmacyId);
  }
}
