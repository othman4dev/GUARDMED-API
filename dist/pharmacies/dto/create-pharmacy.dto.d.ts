declare class LocationDto {
    lat: number;
    lng: number;
}
declare class OpeningHoursDto {
    open_at: string;
    close_at: string;
}
export declare class CreatePharmacyDto {
    name: string;
    address: string;
    phone: string;
    location: LocationDto;
    openingHours: OpeningHoursDto;
    is_guard: boolean;
}
export {};
