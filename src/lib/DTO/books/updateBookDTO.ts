import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


class BookDTO {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({example: 2024})
  @IsNumber()
  year: number

  @ApiProperty()
  @IsArray()
  generes: string[]

  @ApiProperty()
  @IsArray()
  authors: string[]
}


export class UpdateBookDTO extends PartialType(BookDTO) {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({example: 2024})
  @IsNumber()
  year: number

  @ApiProperty()
  @IsArray()
  generes: string[]

  @ApiProperty()
  @IsArray()
  authors: string[]
}