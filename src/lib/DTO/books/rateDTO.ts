import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";



export class RateDTO {
  @ApiProperty()
  @IsNumber()
  @IsEnum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {message: 'rate must be a number from 1 to 10'})
  rate: number
}