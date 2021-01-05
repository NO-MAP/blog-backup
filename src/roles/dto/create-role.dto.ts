import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  readonly roleName: string;

  @ApiProperty()
  @IsString()
  readonly roleCode: string;


  @ApiProperty()
  @IsString()
  readonly description: string;
}