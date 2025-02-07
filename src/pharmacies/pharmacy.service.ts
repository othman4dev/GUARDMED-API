import { Injectable } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmacyService {
    constructor(private readonly pharmacyRepository: PharmacyRepository) { }

    async createPharmacy(pharmacy: CreatePharmacyDto): Promise<string> {
        const plainPharmacy = {
            ...pharmacy,
            location: {
                lat: pharmacy.location.lat,
                lng: pharmacy.location.lng
            },
            openingHours: {
                open_at: pharmacy.openingHours.open_at,
                close_at: pharmacy.openingHours.close_at
            }
        };
        return this.pharmacyRepository.create(plainPharmacy);
    }

    async getAllPharmacies(): Promise<PharmacyInterface[]> {
        return this.pharmacyRepository.findAll();
    }

    async getPharmacyById(id: string): Promise<PharmacyInterface | null> {
        return this.pharmacyRepository.findById(id);
    }

    async updatePharmacy(
        id: string,
        pharmacy: UpdatePharmacyDto,
    ): Promise<PharmacyInterface> {
        const existingPharmacy = await this.pharmacyRepository.findById(id);
        if (!existingPharmacy) {
            throw new Error(`Pharmacy with id ${id} not found`);
        }
        const plainPharmacy = {
            ...pharmacy,
            location: pharmacy.location && {
                lat: pharmacy.location.lat,
                lng: pharmacy.location.lng
            },
            openingHours: pharmacy.openingHours && {
                open_at: pharmacy.openingHours.open_at,
                close_at: pharmacy.openingHours.close_at
            }
        };
    
        await this.pharmacyRepository.update(id, plainPharmacy);
        return this.pharmacyRepository.findById(id);
    }

    async deletePharmacy(id: string): Promise<void> {
        return this.pharmacyRepository.delete(id);
    }
} 