import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { PageQueryUserDto } from './dto/page-query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ConfigService: ConfigService
  ) { }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOneByIdWithRoles(id)
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/list')
  getUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/page')
  async getUsersPage(@Query() pageQueryUserDto: PageQueryUserDto): Promise<any> {
    const data = await this.usersService.pageQueryUser(pageQueryUserDto);
    return {
      records: data[0],
      total: data[1]
    }
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.addUser(createUserDto)
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(updateUserDto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('/:id')
  delUser(@Param('id') id: string) {
    return this.usersService.delUser(id)
  }
}
