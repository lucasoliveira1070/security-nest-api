import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken() {
    //return this.JWTService.sign();
  }

  async checkToken(token: string) {
    //return this.JWTService.verify();
  }

  async login(email: string, password: string) {
    const user = this.prismaService.users.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user)
      throw new UnauthorizedException('Invalid email and/or password ');

    return user;
  }

  async forget(email: string) {
    const user = this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid email');

    //TODO: enviar email
    return true;
  }
  async reset(password: string, token: string) {
    //TODO validar o token
    const id = 0;
    await this.prismaService.users.update({
      where: { id },
      data: {
        password,
      },
    });
    return true;
  }
}
