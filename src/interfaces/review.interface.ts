import { FieldValue } from 'firebase-admin/firestore';

export interface ReviewInterface {
  id?: string;
  userId: string;
  userName: string;
  pharmacyId: string;
  rating: number;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  comment?: string;
}
