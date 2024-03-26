import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CurrentUserDTO {
  @ApiProperty()
  @IsNumber()
  userID: number
}