export declare class UserProfileDto {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean;
    profilePicture?: string;
    bannerPicture?: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
    favorites: string[];
    constructor(partial: Partial<UserProfileDto>);
}
