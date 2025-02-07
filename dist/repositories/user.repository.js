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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../firestore/firestore.service");
const database_tables_enum_1 = require("../enums/database-tables.enum");
const pharmacy_repository_1 = require("./pharmacy.repository");
let UserRepository = class UserRepository {
    constructor(firestoreService, pharmacyRepository) {
        this.firestoreService = firestoreService;
        this.pharmacyRepository = pharmacyRepository;
    }
    async create(user) {
        return this.firestoreService.addDocument(database_tables_enum_1.DatabaseTables.USER, user);
    }
    async findAll() {
        return this.firestoreService.getAllDocuments(database_tables_enum_1.DatabaseTables.USER);
    }
    async findById(id) {
        try {
            console.log('Finding user by ID:', id);
            if (!id) {
                throw new Error('User ID is required');
            }
            const userDoc = await this.firestoreService.getDocument(database_tables_enum_1.DatabaseTables.USER, id);
            if (!userDoc) {
                return null;
            }
            return { id, ...userDoc };
        }
        catch (error) {
            console.error('Find user by ID error:', error);
            throw error;
        }
    }
    async findByEmail(email) {
        return (await this.findAll()).find((user) => user.email === email) || null;
    }
    async update(id, data) {
        try {
            console.log('Updating user:', id, data);
            if (!id) {
                throw new Error('User ID is required');
            }
            await this.firestoreService.updateDocument(database_tables_enum_1.DatabaseTables.USER, id, data);
        }
        catch (error) {
            console.error('Update user error:', error);
            throw error;
        }
    }
    async delete(id) {
        return this.firestoreService.deleteDocument(database_tables_enum_1.DatabaseTables.USER, id);
    }
    async addFavorite(userId, favoriteId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const favorites = user.favorites || [];
        if (favorites.includes(favoriteId)) {
            throw new common_1.HttpException('Favorite already added', common_1.HttpStatus.CONFLICT);
        }
        favorites.push(favoriteId);
        return this.update(userId, { favorites });
    }
    async removeFavorite(userId, favoriteId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const favorites = user.favorites || [];
        const index = favorites.indexOf(favoriteId);
        if (index === -1) {
            throw new common_1.HttpException('Favorite not found', common_1.HttpStatus.NOT_FOUND);
        }
        favorites.splice(index, 1);
        return this.update(userId, { favorites });
    }
    async findAllFavorites(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const favorites = user.favorites || [];
        const favoritePharmacy = await Promise.all(favorites.map((id) => this.pharmacyRepository.findById(id)));
        return favoritePharmacy;
    }
    async removeField(table, field) {
        return this.firestoreService.removeField(table, field);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService,
        pharmacy_repository_1.PharmacyRepository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map