import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(userName: string, password: string): Promise<any> {
    const user: User | undefined = await this.usersService.findOne({
      userName: userName
    });
    const validatePassword: boolean = await user.comparePassword(password);
    if (user && validatePassword) {
      const { password, ...result } = user;
      return result
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.userName, loginDto.password)
    if (!user) {
      throw new BadRequestException("登录失败")
    }
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const checkResult = await this.usersService.checkUser({
      userName: registerDto.userName,
      email: registerDto.email
    })
    if (!checkResult.success) throw new BadRequestException({
      message: checkResult.message
    })

    const newUser: User = await this.usersService.addUser({
      userName: registerDto.userName,
      email: registerDto.email,
      password: registerDto.password
    })
    const { password, ...res } = newUser;
    return res
  }
}
