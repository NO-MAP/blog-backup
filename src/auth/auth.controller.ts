import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { tokenInterface } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res
  }

  @ApiBearerAuth()
  @Roles('sys:user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  async getProfile(@User() user: tokenInterface): Promise<any> {
    const userData = await this.usersService.findOneByIdWithRoles(user.id)
    const { password, ...res } = userData
    return res
  }
}
