import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  exports: [],
  providers: [AuthService],
})
export class AuthModule {}
