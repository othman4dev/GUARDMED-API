import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(req: any, createFavoriteDto: CreateFavoriteDto): Promise<void>;
    findAll(req: any): Promise<any[]>;
    remove(req: any, id: string): Promise<void>;
}
