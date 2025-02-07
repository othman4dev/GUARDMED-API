export declare class LocalStorageService {
    private readonly uploadDir;
    constructor();
    private ensureDirectoriesExist;
    saveFile(file: Express.Multer.File, type: 'profile' | 'banner'): Promise<string>;
}
