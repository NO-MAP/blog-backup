import { BadRequestException, Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) { }

  @Get()
  async getRole(id: string): Promise<Role | undefined> {
    const role: Role | undefined = await this.rolesService.findOneById(id)
    return role
  }

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
}
