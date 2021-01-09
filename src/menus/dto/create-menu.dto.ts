import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";


export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly path: string;

  @ApiProperty()
  @IsString()
  readonly component: string;

  @ApiProperty()
  @IsString()
  readonly redirect: string;

  @ApiProperty()
  @IsBoolean()
  readonly keepalive: boolean;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly icon: string;

  @ApiProperty()
  @IsString()
  readonly parentId: string;
}