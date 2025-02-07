import { Expose } from 'class-transformer';
import { FieldValue } from 'firebase-admin/firestore';

export class ReviewResponseDto {
    @Expose()
    id: string;

    @Expose()
    pharmacyId: string;

    @Expose()
    userId: string;

    @Expose()
    rating: number;

    @Expose()
    comment?: string;

    @Expose()
    userName: string;
    @Expose()
    createdAt: FieldValue;

    @Expose()
    updatedAt: FieldValue;

    constructor(partial: Partial<ReviewResponseDto>) {
        Object.assign(this, partial);
    }
} 