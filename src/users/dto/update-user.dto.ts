import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly userName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly roles?: string[];
}