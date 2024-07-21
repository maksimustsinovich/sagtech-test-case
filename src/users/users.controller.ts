import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async retrieveAllUsers(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async retrieveUserById(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
