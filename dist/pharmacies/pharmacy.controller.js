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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyController = void 0;
const common_1 = require("@nestjs/common");
const pharmacy_service_1 = require("./pharmacy.service");
const create_pharmacy_dto_1 = require("./dto/create-pharmacy.dto");
const update_pharmacy_dto_1 = require("./dto/update-pharmacy.dto");
const pharmacy_response_dto_1 = require("./dto/pharmacy-response.dto");
const passport_1 = require("@nestjs/passport");
let PharmacyController = class PharmacyController {
    constructor(pharmacyService) {
        this.pharmacyService = pharmacyService;
    }
    async create(createPharmacyDto) {
        try {
            const id = await this.pharmacyService.createPharmacy(createPharmacyDto);
            return { id };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create pharmacy', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const pharmacies = await this.pharmacyService.getAllPharmacies();
            return pharmacies.map(pharmacy => new pharmacy_response_dto_1.PharmacyResponseDto(pharmacy));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch pharmacies', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const pharmacy = await this.pharmacyService.getPharmacyById(id);
            if (!pharmacy) {
                throw new common_1.HttpException('Pharmacy not found', common_1.HttpStatus.NOT_FOUND);
            }
            return new pharmacy_response_dto_1.PharmacyResponseDto(pharmacy);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch pharmacy', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updatePharmacyDto) {
        try {
            await this.pharmacyService.updatePharmacy(id, updatePharmacyDto);
            return { message: 'Pharmacy updated successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to update pharmacy', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.pharmacyService.deletePharmacy(id);
            return { message: 'Pharmacy deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete pharmacy', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PharmacyController = PharmacyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pharmacy_dto_1.CreatePharmacyDto]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pharmacy_dto_1.UpdatePharmacyDto]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "remove", null);
exports.PharmacyController = PharmacyController = __decorate([
    (0, common_1.Controller)('pharmacies'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [pharmacy_service_1.PharmacyService])
], PharmacyController);
//# sourceMappingURL=pharmacy.controller.js.map