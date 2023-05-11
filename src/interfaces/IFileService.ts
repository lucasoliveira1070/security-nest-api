import { users } from '@prisma/client';

export interface UploadFileToServer {
  uploadPhoto(user: users, file: Express.Multer.File);
}
