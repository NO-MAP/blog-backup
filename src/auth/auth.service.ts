import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user: User | undefined = await this.usersService.findOne(name);
    if (user && user.password === password) {
      const {password, ...result} = user;
      return result
    }
    return false;
  }
}
