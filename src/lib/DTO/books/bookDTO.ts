import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsArray, IsOptional } from "class-validator";


export class BookDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string

  @ApiProperty()
  @IsOptional()
  @IsArray()
  generes: string[]

  @ApiProperty()
  @IsOptional()
  @IsArray()
  authors: string[]
}