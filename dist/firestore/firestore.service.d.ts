import { ConfigService } from '@nestjs/config';
import { DatabaseTables } from 'src/enums/database-tables.enum';
export declare class FirestoreService {
    private configService;
    private db;
    private readonly logger;
    constructor(configService: ConfigService);
    getAllDocuments(collection: DatabaseTables): Promise<any[]>;
    getDocument(collection: DatabaseTables, id: string): Promise<any>;
    addDocument(collection: DatabaseTables, data: any): Promise<string>;
    updateDocument(collection: DatabaseTables, id: string, data: any): Promise<void>;
    deleteDocument(collection: DatabaseTables, id: string): Promise<void>;
    removeField(docPath: string, fieldName: string): Promise<void>;
}
