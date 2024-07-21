import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAllUsers(): Promise<UserDto[]> {
    return await this.prismaClient.user.findMany();
  }

  async getUserById(id: number): Promise<UserDto> {
    return await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        password: await bcrypt.hash(updateUserDto.password, 10),
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
