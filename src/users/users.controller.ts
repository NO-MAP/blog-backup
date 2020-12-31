import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ConfigService: ConfigService
  ) { }

  @Get()
  async getConfig() {
    const data = await bcrypt.hash('123456789', 10);
    console.log(data)
    return this.ConfigService.get('DB');
  }

  @Get('/list')
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto)
  }
}
