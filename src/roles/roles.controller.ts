import { BadRequestException, Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
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
    let role: Role | undefined = await this.rolesService.searchOne({
      roleName: createRoleDto.roleName,
      roleCode: createRoleDto.roleCode
    })
    if (role) {
      throw new BadRequestException('角色名或者角色代码已被使用')
    }
    role = await this.rolesService.addRole(createRoleDto);
    return role
  }
}
