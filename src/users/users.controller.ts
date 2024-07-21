import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  register() {
    return this.usersService.register();
  }

  @Post('auth/login')
  login() {
    return this.usersService.login();
  }

  @Get('users')
  retrieveAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('users/:id')
  retrieveUserById() {
    return this.usersService.getUserById();
  }

  @Put('users/:id')
  updateUser() {
    return this.usersService.updateUser();
  }

  @Delete('users/:id')
  deleteUser() {
    return this.usersService.deleteUser();
  }
}
