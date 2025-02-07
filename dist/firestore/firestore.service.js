"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FirestoreService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreService = void 0;
const common_1 = require("@nestjs/common");
const admin = __importStar(require("firebase-admin"));
const config_1 = require("@nestjs/config");
const firestore_1 = require("firebase-admin/firestore");
const firebase_admin_1 = require("firebase-admin");
let FirestoreService = FirestoreService_1 = class FirestoreService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(FirestoreService_1.name);
        if (!admin.apps.length) {
            try {
                const serviceAccount = {
                    type: 'service_account',
                    project_id: this.configService.get('FIREBASE_PROJECT_ID'),
                    private_key_id: this.configService.get('FIREBASE_PRIVATE_KEY_ID'),
                    private_key: this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
                    client_email: this.configService.get('FIREBASE_CLIENT_EMAIL'),
                    client_id: this.configService.get('FIREBASE_CLIENT_ID'),
                    auth_uri: this.configService.get('FIREBASE_AUTH_URI'),
                    token_uri: this.configService.get('FIREBASE_TOKEN_URI'),
                    auth_provider_x509_cert_url: this.configService.get('FIREBASE_AUTH_CERT_URL'),
                    client_x509_cert_url: this.configService.get('FIREBASE_CLIENT_CERT_URL'),
                };
                this.logger.debug('Initializing Firebase with config:', serviceAccount);
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: this.configService.get('FIRESTORE_DATABASE_URL'),
                });
                this.logger.log('Firebase initialized successfully');
            }
            catch (error) {
                this.logger.error('Error initializing Firebase:', error);
                throw error;
            }
        }
        this.db = admin.firestore();
    }
    async getAllDocuments(collection) {
        const snapshot = await this.db.collection(collection).get();
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }
    async getDocument(collection, id) {
        const doc = await this.db.collection(collection).doc(id).get();
        return doc.exists ? { ...doc.data(), id: doc.id } : null;
    }
    async addDocument(collection, data) {
        const doc = {
            ...data,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        };
        const docRef = await this.db.collection(collection).add(doc);
        return docRef.id;
    }
    async updateDocument(collection, id, data) {
        await this.db
            .collection(collection)
            .doc(id)
            .update({
            ...data,
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
    }
    async deleteDocument(collection, id) {
        await this.db.collection(collection).doc(id).delete();
    }
    async removeField(docPath, fieldName) {
        const docRef = this.db.doc(docPath);
        await docRef.update({
            [fieldName]: firebase_admin_1.firestore.FieldValue.delete(),
        });
    }
};
exports.FirestoreService = FirestoreService;
exports.FirestoreService = FirestoreService = FirestoreService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FirestoreService);
//# sourceMappingURL=firestore.service.js.map