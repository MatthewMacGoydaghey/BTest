import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { JWTpayload, Roles } from "../misc";


export const POSITIONS_KEY = 'positions'
export const RequiredPositions = (...positions: Roles[]) => SetMetadata(POSITIONS_KEY, positions)



@Injectable()
export class PositionGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  const requiredPositions = this.reflector.getAllAndOverride<Roles[]>(POSITIONS_KEY, [
    context.getHandler(),
    context.getClass()
  ])
  const request = context.switchToHttp().getRequest()
  const payload: JWTpayload = request.user
 if (requiredPositions.includes(payload.role)) {
  return true
} else {
  throw new ForbiddenException({message: 'Only users with role `Administrator` can use this route'})
}
 }}
  