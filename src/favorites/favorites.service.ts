import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class FavoritesService {
  private readonly userId = 'oubX1xmZbybtA57oD0Uo';
  constructor(private readonly userRepository: UserRepository) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.userRepository.addFavorite(
      this.userId,
      createFavoriteDto.pharmacyId,
    );
  }

  async findAll() {
    return this.userRepository.findAllFavorites(this.userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: string) {
    return this.userRepository.removeFavorite(this.userId, id);
  }
}
