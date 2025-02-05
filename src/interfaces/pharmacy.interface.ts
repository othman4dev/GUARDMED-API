export interface PharmacyInterface {
  id?: string;
  name: string;
  address: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  openingHours: {
    open_at: string;
    close_at: string;
  };
  is_guard: boolean;
}
