import { FieldValue } from 'firebase-admin/firestore';

export interface ReviewInterface {
  id?: string;
  userId: string;
  pharmacyId: string;
  rating: number;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  comment?: string;
}
