import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly JWTService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: users) {
    return {
      accessToken: this.JWTService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  async login(email: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    console.log(user, password);
    if (!user)
      throw new UnauthorizedException('Invalid email and/or password ');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email and/or password ');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.users.findFirst({
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
    const user = await this.prismaService.users.update({
      where: { id },
      data: {
        password,
      },
    });
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
