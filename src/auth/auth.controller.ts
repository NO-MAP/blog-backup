import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }


  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res
  }

  @ApiBearerAuth()
  @Roles('SYS:admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/profile')
  getProfile(@User() user) {
    return user;
  }
}
