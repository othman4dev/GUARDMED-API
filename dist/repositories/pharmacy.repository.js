"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyRepository = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../firestore/firestore.service");
const database_tables_enum_1 = require("../enums/database-tables.enum");
let PharmacyRepository = class PharmacyRepository {
    constructor(firestoreService) {
        this.firestoreService = firestoreService;
    }
    async create(pharmacy) {
        return this.firestoreService.addDocument(database_tables_enum_1.DatabaseTables.PHARMACY, pharmacy);
    }
    async findAll() {
        return this.firestoreService.getAllDocuments(database_tables_enum_1.DatabaseTables.PHARMACY);
    }
    async findById(id) {
        return this.firestoreService.getDocument(database_tables_enum_1.DatabaseTables.PHARMACY, id);
    }
    async update(id, pharmacy) {
        try {
            return await this.firestoreService.updateDocument(database_tables_enum_1.DatabaseTables.PHARMACY, id, pharmacy);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        return this.firestoreService.deleteDocument(database_tables_enum_1.DatabaseTables.PHARMACY, id);
    }
};
exports.PharmacyRepository = PharmacyRepository;
exports.PharmacyRepository = PharmacyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], PharmacyRepository);
//# sourceMappingURL=pharmacy.repository.js.map