import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prismaService.users.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.users.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.users.findFirst({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateUserDTO, id: number) {
    this.checkIfUserExists(id);
    return this.prismaService.users.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(
    { email, name, password }: UpdatePatchUserDTO,
    id: number,
  ) {
    this.checkIfUserExists(id);
    const data: any = {};
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) data.password = password;
    return this.prismaService.users.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    this.checkIfUserExists(id);
    return this.prismaService.users.delete({
      where: { id },
    });
  }

  async checkIfUserExists(id: number) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
  }
}
