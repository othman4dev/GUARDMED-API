import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { FieldValue } from 'firebase-admin/firestore';
import { DatabaseTables } from 'src/enums/database-tables.enum';
import { firestore } from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private db: admin.firestore.Firestore;
  private readonly logger = new Logger(FirestoreService.name);

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      try {
        const serviceAccount: any = {
          type: 'service_account',
          project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
          private_key: this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
          client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
          auth_uri: this.configService.get<string>('FIREBASE_AUTH_URI'),
          token_uri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
          auth_provider_x509_cert_url: this.configService.get<string>('FIREBASE_AUTH_CERT_URL'),
          client_x509_cert_url: this.configService.get<string>('FIREBASE_CLIENT_CERT_URL'),
        };

        this.logger.debug('Initializing Firebase with config:', serviceAccount);
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: this.configService.get<string>('FIRESTORE_DATABASE_URL'),
        });
        
        this.logger.log('Firebase initialized successfully');
      } catch (error) {
        this.logger.error('Error initializing Firebase:', error);
        throw error;
      }
    }
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
