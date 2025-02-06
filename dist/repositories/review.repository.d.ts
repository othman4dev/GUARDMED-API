import { FirestoreService } from '../firestore/firestore.service';
import { ReviewInterface } from '../interfaces/review.interface';
export declare class ReviewRepository {
    private readonly firestoreService;
    constructor(firestoreService: FirestoreService);
    create(review: ReviewInterface): Promise<string>;
    findAll(): Promise<ReviewInterface[]>;
    findById(id: string): Promise<ReviewInterface | null>;
    update(id: string, review: Partial<ReviewInterface>): Promise<void>;
    delete(id: string): Promise<void>;
}
