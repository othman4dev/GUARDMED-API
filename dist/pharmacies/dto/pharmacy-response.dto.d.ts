declare class LocationResponseDto {
    lat: number;
    lng: number;
}
declare class OpeningHoursResponseDto {
    open_at: string;
    close_at: string;
}
export declare class PharmacyResponseDto {
    id: string;
    name: string;
    address: string;
    phone: string;
    location: LocationResponseDto;
    openingHours: OpeningHoursResponseDto;
    is_guard: boolean;
    constructor(partial: Partial<PharmacyResponseDto>);
}
export {};
