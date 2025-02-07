import { FieldValue } from 'firebase-admin/firestore';
export declare class ReviewResponseDto {
    id: string;
    pharmacyId: string;
    userId: string;
    rating: number;
    comment?: string;
    userName: string;
    createdAt: FieldValue;
    updatedAt: FieldValue;
    constructor(partial: Partial<ReviewResponseDto>);
}
