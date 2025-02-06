import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { FieldValue } from 'firebase-admin/firestore';
import { DatabaseTables } from 'src/enums/database-tables.enum';
import { firestore } from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private db: admin.firestore.Firestore;

  private static serviceAccount = {
    type: process.env.FIRESTORE_TYPE,
    project_id: process.env.FIRESTORE_PROJECT_ID,
    private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
    private_key: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    client_id: process.env.FIRESTORE_CLIENT_ID,
    auth_uri: process.env.FIRESTORE_AUTH_URI,
    token_uri: process.env.FIRESTORE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL,
  };

  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        FirestoreService.serviceAccount as admin.ServiceAccount,
      ),
      databaseURL: this.configService.get<string>('FIRESTORE_DATABASE_URL'),
    });
    this.db = admin.firestore();
  }

  async getAllDocuments(collection: DatabaseTables): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async getDocument(collection: DatabaseTables, id: string): Promise<any> {
    const doc = await this.db.collection(collection).doc(id).get();
    return doc.exists ? { ...doc.data(), id: doc.id } : null;
  }

  async addDocument(collection: DatabaseTables, data: any): Promise<string> {
    const doc = {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const docRef = await this.db.collection(collection).add(doc);
    return docRef.id;
  }

  async updateDocument(
    collection: DatabaseTables,
    id: string,
    data: any,
  ): Promise<void> {
    await this.db
      .collection(collection)
      .doc(id)
      .update({
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      });
  }

  async deleteDocument(collection: DatabaseTables, id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }

  async removeField(docPath: string, fieldName: string) {
    const docRef = this.db.doc(docPath);
    await docRef.update({
      [fieldName]: firestore.FieldValue.delete(),
    });
  }
}
