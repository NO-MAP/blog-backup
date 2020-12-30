import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(name: string, password: string): Promise<any> {
    const user: User | undefined = await this.usersService.findOne(name);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, email: user.emial };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
