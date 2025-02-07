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
exports.PharmacyService = void 0;
const common_1 = require("@nestjs/common");
const pharmacy_repository_1 = require("../repositories/pharmacy.repository");
let PharmacyService = class PharmacyService {
    constructor(pharmacyRepository) {
        this.pharmacyRepository = pharmacyRepository;
    }
    async createPharmacy(pharmacy) {
        const plainPharmacy = {
            ...pharmacy,
            location: {
                lat: pharmacy.location.lat,
                lng: pharmacy.location.lng
            },
            openingHours: {
                open_at: pharmacy.openingHours.open_at,
                close_at: pharmacy.openingHours.close_at
            }
        };
        return this.pharmacyRepository.create(plainPharmacy);
    }
    async getAllPharmacies() {
        return this.pharmacyRepository.findAll();
    }
    async getPharmacyById(id) {
        return this.pharmacyRepository.findById(id);
    }
    async updatePharmacy(id, pharmacy) {
        const existingPharmacy = await this.pharmacyRepository.findById(id);
        if (!existingPharmacy) {
            throw new Error(`Pharmacy with id ${id} not found`);
        }
        const plainPharmacy = {
            ...pharmacy,
            location: pharmacy.location && {
                lat: pharmacy.location.lat,
                lng: pharmacy.location.lng
            },
            openingHours: pharmacy.openingHours && {
                open_at: pharmacy.openingHours.open_at,
                close_at: pharmacy.openingHours.close_at
            }
        };
        await this.pharmacyRepository.update(id, plainPharmacy);
        return this.pharmacyRepository.findById(id);
    }
    async deletePharmacy(id) {
        return this.pharmacyRepository.delete(id);
    }
};
exports.PharmacyService = PharmacyService;
exports.PharmacyService = PharmacyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacy_repository_1.PharmacyRepository])
], PharmacyService);
//# sourceMappingURL=pharmacy.service.js.map