import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserRepository } from 'src/repositories/user.repository';
export declare class FavoritesService {
    private readonly userRepository;
    private readonly userId;
    constructor(userRepository: UserRepository);
    create(createFavoriteDto: CreateFavoriteDto): Promise<void>;
    findAll(): Promise<import("../interfaces/pharmacy.interface").PharmacyInterface[]>;
    findOne(id: number): string;
    remove(id: string): Promise<void>;
}
