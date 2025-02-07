import { FieldValue } from 'firebase-admin/firestore';
export interface ReviewData {
    userId: string;
    userName: string;
    pharmacyId: string;
    rating: number;
    createdAt: Date | FieldValue;
    updatedAt: Date | FieldValue;
    comment?: string;
}
export declare class CreateReviewDto {
    pharmacyId: string;
    rating: number;
    comment?: string;
}
