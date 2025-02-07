import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const bucket = getStorage().bucket();
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
    });

    return (await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    }))[0];
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const bucket = getStorage().bucket();
    const fileName = fileUrl.split('/').pop().split('?')[0];
    await bucket.file(fileName).delete();
  }
} 