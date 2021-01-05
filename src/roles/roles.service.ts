import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';

interface searchInterface {
  roleName?: string;
  roleCode?: string;
}

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }

  findOneById(id: string): Promise<Role | undefined> {
    return this.rolesRepository.findOne(id)
  }

  addRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role)
  }

  async searchOne(search: searchInterface): Promise<Role | undefined> {
    let role: Role | undefined;
    const { roleName, roleCode } = search;
    if (roleName) {
      role = await this.rolesRepository.findOne({ roleName: roleName })
      return role
    }
    if (roleCode) {
      role = await this.rolesRepository.findOne({ roleCode: roleCode })
      return role
    }
  }
}
