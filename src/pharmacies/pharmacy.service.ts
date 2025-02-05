import { Injectable, NotFoundException } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { calculateDistance } from './helpers/helper';

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
        await this.pharmacyRepository.update(id, pharmacy);
        return this.pharmacyRepository.findById(id);
    }

    async deletePharmacy(id: string): Promise<void> {
        return this.pharmacyRepository.delete(id);
    }
    async getNearbyGuardPharmacies(latitude: number, longitude: number): Promise<PharmacyInterface[]> {
      const pharmacies = await this.pharmacyRepository.findAll();
  
      // Filter pharmacies by distance
      const nearbyPharmacies = pharmacies.filter((pharmacy) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          pharmacy.location.lat,
          pharmacy.location.lng
        );
        return distance <= 10; 
      });
  
      return nearbyPharmacies;
    }
} 