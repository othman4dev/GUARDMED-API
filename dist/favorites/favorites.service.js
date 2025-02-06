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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
let FavoritesService = class FavoritesService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.userId = 'oubX1xmZbybtA57oD0Uo';
    }
    create(createFavoriteDto) {
        return this.userRepository.addFavorite(this.userId, createFavoriteDto.pharmacyId);
    }
    async findAll() {
        return this.userRepository.findAllFavorites(this.userId);
    }
    findOne(id) {
        return `This action returns a #${id} favorite`;
    }
    remove(id) {
        return this.userRepository.removeFavorite(this.userId, id);
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map