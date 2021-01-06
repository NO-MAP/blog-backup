import { Body, Controller, Get, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
import { CreateUserDto } from './dto/create-user.dto';
import { PageQueryUserDto } from './dto/page-query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ConfigService: ConfigService
  ) { }

  @Get()
  getConfig(): string {
    return this.ConfigService.get('JWT_SECRET_KEY')
  }

  @Get('/list')
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get('/page')
  async getUsersPage(@Query() pageQueryUserDto: PageQueryUserDto): Promise<any> {
    const data = await this.usersService.pageQueryUser(pageQueryUserDto);
    return {
      records: data[0],
      total: data[1]
    }
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto)
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(updateUserDto)
  }
}
