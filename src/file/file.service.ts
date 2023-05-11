import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { users } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { UploadFileToServer } from '../interfaces/IFileService';

@Injectable()
export class FileService implements UploadFileToServer {
  async uploadPhoto(user: users, file: Express.Multer.File) {
    const result = await writeFile(
      join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.jpeg`),
      file.buffer,
    );
    return { result };
  }
}
