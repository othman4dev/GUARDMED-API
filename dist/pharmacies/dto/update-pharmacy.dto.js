"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePharmacyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pharmacy_dto_1 = require("./create-pharmacy.dto");
class UpdatePharmacyDto extends (0, mapped_types_1.PartialType)(create_pharmacy_dto_1.CreatePharmacyDto) {
}
exports.UpdatePharmacyDto = UpdatePharmacyDto;
//# sourceMappingURL=update-pharmacy.dto.js.map