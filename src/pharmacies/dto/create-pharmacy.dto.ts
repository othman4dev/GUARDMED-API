import { IsString, IsBoolean, IsNotEmpty, IsObject, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    lng: number;
}

class OpeningHoursDto {
    @IsString()
    @IsNotEmpty()
    open_at: string;

    @IsString()
    @IsNotEmpty()
    close_at: string;
}

export class CreatePharmacyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsObject()
    @ValidateNested()
    @Type(() => OpeningHoursDto)
    openingHours: OpeningHoursDto;

    @IsBoolean()
    is_guard: boolean;
} 