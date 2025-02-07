import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserRepository } from '../repositories/user.repository';
export declare class FavoritesService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<void>;
    findAll(userId: string): Promise<any[]>;
    findOne(id: number): string;
    remove(userId: string, pharmacyId: string): Promise<void>;
}
