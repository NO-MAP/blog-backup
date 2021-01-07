import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { id } = request.user;
    const user = await this.userService.findOneByIdWithRoles(id);
    const userRoles = user.roles.map(item => item.roleCode)
    console.log(roles, userRoles, intersection(roles, userRoles).length === roles.length)
    return intersection(roles, userRoles).length === roles.length
  }
}