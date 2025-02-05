import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { DatabaseTables } from '../enums/database-tables.enum';
import { ReviewInterface } from '../interfaces/review.interface';

@Injectable()
export class ReviewRepository {
  constructor(private readonly firestoreService: FirestoreService) { }

  async create(review: ReviewInterface): Promise<string> {
    return this.firestoreService.addDocument(DatabaseTables.REVIEW, review);
  }

  async findAll(): Promise<ReviewInterface[]> {
    return this.firestoreService.getAllDocuments(
      DatabaseTables.REVIEW,
    ) as Promise<ReviewInterface[]>;
  }

  async findById(id: string): Promise<ReviewInterface | null> {
    return this.firestoreService.getDocument(
      DatabaseTables.REVIEW,
      id,
    ) as Promise<ReviewInterface | null>;
  }

  async update(id: string, review: Partial<ReviewInterface>): Promise<void> {
    return this.firestoreService.updateDocument(
      DatabaseTables.REVIEW,
      id,
      review,
    );
  }

  async delete(id: string): Promise<void> {
    return this.firestoreService.deleteDocument(DatabaseTables.REVIEW, id);
  }

  
}
