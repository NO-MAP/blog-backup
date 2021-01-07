import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) { }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/list')
  getAllRoles() {
    return this.rolesService.findAllRoles()
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<Role | undefined> {
    const role: Role | undefined = await this.rolesService.findOneById(id)
    return role
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async addRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const checkResult = await this.rolesService.checkRole({
      roleName: createRoleDto.roleName,
      roleCode: createRoleDto.roleCode
    })
    if (!checkResult.success) {
      throw new BadRequestException({
        message: checkResult.message
      })
    }
    const role: Role = await this.rolesService.addRole(createRoleDto);
    return role
  }

  @ApiBearerAuth()
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put()
  updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(updateRoleDto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @Roles('sys:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async delRole(@Param('id') id: string) {
    const result = await this.rolesService.delRole(id);
    return result
  }
}
