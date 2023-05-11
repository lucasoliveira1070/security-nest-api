import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';
@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
