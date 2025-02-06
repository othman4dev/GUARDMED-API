import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { PharmacyResponseDto } from './dto/pharmacy-response.dto';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
export declare class PharmacyController {
    private readonly pharmacyService;
    constructor(pharmacyService: PharmacyService);
    create(createPharmacyDto: CreatePharmacyDto): Promise<{
        id: string;
    }>;
    findAll(): Promise<PharmacyResponseDto[]>;
    update(id: string, updatePharmacyDto: UpdatePharmacyDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getNearbyGuardPharmacies(lat: string, lng: string): Promise<PharmacyInterface[]>;
    findOne(id: string): Promise<PharmacyResponseDto>;
}
