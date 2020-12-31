import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { Match } from "./match.decorator";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsEmail({}, {
    message: "邮箱格式不合规范"
  })
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @Match('password', {
    message: "两次密码不同"
  })
  readonly passwordConfirm: string;
}