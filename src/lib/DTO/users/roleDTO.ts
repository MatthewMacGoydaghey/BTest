import { IsEnum } from "class-validator";
import { RoleEnum } from "../../misc";

export class RoleDTO {
  @IsEnum(['Admin', 'User'], {message: 'Value must be one of the following roles: Admin, User'})
  role: RoleEnum
}