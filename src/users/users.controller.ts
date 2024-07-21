import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return await this.usersService.register(registerDto);
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    return await this.usersService.login(loginDto);
  }

  @Get('users')
  async retrieveAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('users/:id')
  async retrieveUserById(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
