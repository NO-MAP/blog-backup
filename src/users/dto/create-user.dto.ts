import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;
}