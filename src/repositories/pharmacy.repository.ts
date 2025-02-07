import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { DatabaseTables } from '../enums/database-tables.enum';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';

@Injectable()
export class PharmacyRepository {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(pharmacy: PharmacyInterface): Promise<string> {
    return this.firestoreService.addDocument(DatabaseTables.PHARMACY, pharmacy);
  }

  async findAll(): Promise<PharmacyInterface[]> {
    return this.firestoreService.getAllDocuments(
      DatabaseTables.PHARMACY,
    ) as Promise<PharmacyInterface[]>;
  }

  async findById(id: string): Promise<PharmacyInterface | null> {
    return this.firestoreService.getDocument(
      DatabaseTables.PHARMACY,
      id,
    ) as Promise<PharmacyInterface | null>;
  }

  async update(
    id: string,
    pharmacy: Partial<PharmacyInterface>,
): Promise<void> { 
    try {
        return await this.firestoreService.updateDocument(
            DatabaseTables.PHARMACY,
            id,
            pharmacy,
        );
    } catch (error) {
        throw error;
    }
}

  async delete(id: string): Promise<void> {
    return this.firestoreService.deleteDocument(DatabaseTables.PHARMACY, id);
  }
}
