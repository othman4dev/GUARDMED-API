import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';
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

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    pharmacyId: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    comment?: string;
} 