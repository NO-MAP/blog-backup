import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class PageQueryUserDto {
  @ApiProperty()
  @Transform(current => parseInt(current))
  @IsInt()
  readonly current: number;

  @ApiProperty()
  @Transform(pageSize => parseInt(pageSize))
  @IsInt()
  readonly pageSize: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly userName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly email?: string;
}