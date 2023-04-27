import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create(data: CreateUserDTO) {}
  async findAll() {}
  async findOne(id: number) {}
  async update(data: UpdateUserDTO, id: number) {}
  async updatePartial(data: UpdatePatchUserDTO, id: number) {}
  async delete(id: number) {}
}
