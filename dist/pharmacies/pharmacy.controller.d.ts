import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { PharmacyResponseDto } from './dto/pharmacy-response.dto';
export declare class PharmacyController {
    private readonly pharmacyService;
    constructor(pharmacyService: PharmacyService);
    create(createPharmacyDto: CreatePharmacyDto): Promise<{
        id: string;
    }>;
    findAll(): Promise<PharmacyResponseDto[]>;
    findOne(id: string): Promise<PharmacyResponseDto>;
    update(id: string, updatePharmacyDto: UpdatePharmacyDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
