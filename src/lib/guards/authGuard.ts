import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Observable } from "rxjs"
import { IS_PUBLIC_KEY } from "../DTO/users/constants"



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private Reflector: Reflector) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

  const isPublic = this.Reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass()
  ])

  if (isPublic) {
    return true
  }

   const request = context.switchToHttp().getRequest()
   try {
    let token = ''
    let authHeader = request.headers.authorization
    if (authHeader) {
      token = authHeader.split(' ')[1]
    } else {
      authHeader = request.headers.jwt
      token = authHeader
      if (!authHeader) {
      throw new UnauthorizedException({message: 'AuthHeader not found'})
      }
    }
    if (!token) {
     throw new UnauthorizedException({message: 'Token not found'});
   }
   const user = this.jwtService.verify(token)
   request['user'] = user
   return true
   } catch (error) {
    throw new UnauthorizedException({message: error})
   }
  }
  
}