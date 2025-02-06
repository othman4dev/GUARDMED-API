import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<void>;
    findAll(): Promise<import("../interfaces/pharmacy.interface").PharmacyInterface[]>;
    remove(id: string): Promise<void>;
}
