import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/lib/DTO/auth/userDTO';
import { Public } from 'src/lib/DTO/auth/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/lib/DTO/auth/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {

  }


  @ApiOperation({summary: "Регистрирует пользователя"})
  @ApiResponse({status: 201, type: User})
  @Public()
  @Post('/reg')
  regUser(@Body() body: UserDTO) {
 return this.AuthService.regUser(body)
  }


  @ApiOperation({summary: "Возвращает JWT-токен"})
  @ApiResponse({status: 200})
  @Public()
  @Get()
  login(@Body() body: UserDTO) {
 return this.AuthService.login(body)
  }
}
