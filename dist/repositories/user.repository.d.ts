import { FirestoreService } from '../firestore/firestore.service';
import { UserInterface } from '../interfaces/user.interface';
import { PharmacyRepository } from './pharmacy.repository';
export declare class UserRepository {
    private readonly firestoreService;
    private readonly pharmacyRepository;
    constructor(firestoreService: FirestoreService, pharmacyRepository: PharmacyRepository);
    create(user: UserInterface): Promise<string>;
    findAll(): Promise<UserInterface[]>;
    findById(id: string): Promise<UserInterface | null>;
    findByEmail(email: string): Promise<UserInterface | null>;
    update(id: string, user: Partial<UserInterface>): Promise<void>;
    delete(id: string): Promise<void>;
    addFavorite(userId: string, favoriteId: string): Promise<void>;
    removeFavorite(userId: string, favoriteId: string): Promise<void>;
    findAllFavorites(userId: string): Promise<import("../interfaces/pharmacy.interface").PharmacyInterface[]>;
    removeField(table: string, field: string): Promise<void>;
}
