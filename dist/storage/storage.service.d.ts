export declare class StorageService {
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
