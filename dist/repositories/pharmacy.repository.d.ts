import { FirestoreService } from '../firestore/firestore.service';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
export declare class PharmacyRepository {
    private readonly firestoreService;
    constructor(firestoreService: FirestoreService);
    create(pharmacy: PharmacyInterface): Promise<string>;
    findAll(): Promise<PharmacyInterface[]>;
    findById(id: string): Promise<PharmacyInterface | null>;
    update(id: string, pharmacy: Partial<PharmacyInterface>): Promise<void>;
    delete(id: string): Promise<void>;
}
