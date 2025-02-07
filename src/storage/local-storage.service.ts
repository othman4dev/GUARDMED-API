import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageService {
  private readonly uploadDir = 'uploads';

  constructor() {
    // Créer les dossiers nécessaires au démarrage
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    const dirs = [
      'uploads/images/profile',
      'uploads/images/banner'
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async saveFile(file: Express.Multer.File, type: 'profile' | 'banner'): Promise<string> {
    try {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join('uploads', 'images', type, fileName);
      
      // Écrire le fichier
      await fs.promises.writeFile(filePath, file.buffer);
      
      // Retourner le chemin relatif
      return filePath;
    } catch (error) {
      console.error('File save error:', error);
      throw new Error('Failed to save file');
    }
  }
} 