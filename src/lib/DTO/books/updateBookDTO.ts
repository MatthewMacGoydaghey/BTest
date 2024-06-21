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
  @IsString()
  generes: string

  @ApiProperty()
  @IsString()
  author: string
}


export class UpdateBookDTO extends PartialType(BookDTO) {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({example: 2024})
  @IsNumber()
  year: number

  @ApiProperty()
  @IsString()
  generes: string

  @ApiProperty()
  @IsString()
  author: string

  @ApiProperty()
  @IsString()
  publicationDate: string
}