import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { DatabaseTables } from '../enums/database-tables.enum';
import { UserInterface } from '../interfaces/user.interface';
import { PharmacyRepository } from './pharmacy.repository';

@Injectable()
export class UserRepository {
  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly pharmacyRepository: PharmacyRepository,
  ) { }

  async create(user: UserInterface): Promise<string> {
    return this.firestoreService.addDocument(DatabaseTables.USER, user);
  }

  async findAll(): Promise<UserInterface[]> {
    return this.firestoreService.getAllDocuments(
      DatabaseTables.USER,
    ) as Promise<UserInterface[]>;
  }

  async findById(id: string): Promise<any> {
    try {
      console.log('Finding user by ID:', id);
      if (!id) {
        throw new Error('User ID is required');
      }
      
      const userDoc = await this.firestoreService.getDocument(DatabaseTables.USER, id);
      if (!userDoc) {
        return null;
      }
      return { id, ...userDoc };
    } catch (error) {
      console.error('Find user by ID error:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    return (await this.findAll()).find((user) => user.email === email) || null;
  }

  async update(id: string, data: any): Promise<void> {
    try {
      console.log('Updating user:', id, data);
      if (!id) {
        throw new Error('User ID is required');
      }
      
      await this.firestoreService.updateDocument(DatabaseTables.USER, id, data);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    return this.firestoreService.deleteDocument(DatabaseTables.USER, id);
  }

  async addFavorite(userId: string, favoriteId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const favorites = user.favorites || [];
    if (favorites.includes(favoriteId)) {
      throw new HttpException('Favorite already added', HttpStatus.CONFLICT);
    }
    favorites.push(favoriteId);
    return this.update(userId, { favorites });
  }

  async removeFavorite(userId: string, favoriteId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const favorites = user.favorites || [];
    const index = favorites.indexOf(favoriteId);
    if (index === -1) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    favorites.splice(index, 1);
    return this.update(userId, { favorites });
  }

  async findAllFavorites(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const favorites = user.favorites || [];
    const favoritePharmacy = await Promise.all(
      favorites.map((id) => this.pharmacyRepository.findById(id)),
    );
    return favoritePharmacy;
  }

  async removeField(table: string, field: string) {
    return this.firestoreService.removeField(table, field);
  }
}
