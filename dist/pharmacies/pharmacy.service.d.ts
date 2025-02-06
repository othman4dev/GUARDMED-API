import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
export declare class PharmacyService {
    private readonly pharmacyRepository;
    constructor(pharmacyRepository: PharmacyRepository);
    createPharmacy(pharmacy: CreatePharmacyDto): Promise<string>;
    getAllPharmacies(): Promise<PharmacyInterface[]>;
    getPharmacyById(id: string): Promise<PharmacyInterface | null>;
    updatePharmacy(id: string, pharmacy: UpdatePharmacyDto): Promise<PharmacyInterface>;
    deletePharmacy(id: string): Promise<void>;
    getNearbyGuardPharmacies(latitude: number, longitude: number): Promise<PharmacyInterface[]>;
}
