"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("firebase-admin/storage");
let StorageService = class StorageService {
    async uploadFile(file, folder) {
        const bucket = (0, storage_1.getStorage)().bucket();
        const fileName = `${folder}/${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(fileName);
        await fileUpload.save(file.buffer, {
            contentType: file.mimetype,
        });
        return (await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
        }))[0];
    }
    async deleteFile(fileUrl) {
        const bucket = (0, storage_1.getStorage)().bucket();
        const fileName = fileUrl.split('/').pop().split('?')[0];
        await bucket.file(fileName).delete();
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)()
], StorageService);
//# sourceMappingURL=storage.service.js.map