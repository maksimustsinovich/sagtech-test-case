import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, User } from './entity/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

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

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async createUser(data: RegisterDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prismaClient.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: Role.USER,
      },
    });
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
