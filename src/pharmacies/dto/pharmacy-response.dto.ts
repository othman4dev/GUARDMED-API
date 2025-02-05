import { Exclude, Expose } from 'class-transformer';

class LocationResponseDto {
    @Expose()
    lat: number;

    @Expose()
    lng: number;
}

class OpeningHoursResponseDto {
    @Expose()
    open_at: string;

    @Expose()
    close_at: string;
}

export class PharmacyResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    phone: string;

    @Expose()
    location: LocationResponseDto;

    @Expose()
    openingHours: OpeningHoursResponseDto;

    @Expose()
    is_guard: boolean;

    constructor(partial: Partial<PharmacyResponseDto>) {
        Object.assign(this, partial);
    }
} 