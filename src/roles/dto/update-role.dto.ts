import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly roleName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly roleCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;
}