export interface UserInterface {
    id?: string;
    name: string;
    email: string;
    password: string;
    favorites: string[];
    role: string;
    verified: boolean;
    code?: number;
    profilePicture?: string;
    bannerPicture?: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
