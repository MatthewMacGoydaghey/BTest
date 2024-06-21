import { Body, Controller, Get, Header, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/lib/DTO/users/userDTO';
import { Public } from 'src/lib/DTO/users/constants';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/lib/DTO/users/user.entity';
import { UsersService } from './users.service';
import { PositionGuard, RequiredPositions } from '../lib/guards/postitonGuard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

  }


  @ApiOperation({summary: "Регистрирует пользователя"})
  @ApiResponse({status: 201, type: User})
  @Public()
  @Post('/register')
  regUser(@Body() body: UserDTO) {
 return this.usersService.regUser(body)
  }


  @ApiOperation({summary: "Возвращает JWT-токен"})
  @ApiResponse({status: 200})
  @Public()
  @Post('/login')
  login(@Body() body: UserDTO) {
 return this.usersService.login(body)
  }


  @ApiOperation({summary: "Подтверждение email"})
  @ApiResponse({status: 200})
  @Public()
  @Post('/verifyEmail')
  verifyEmail(@Query('token') token: string) {
    return this.usersService.verifyEmail(token)
  }


  @ApiOperation({summary: "Меняет роль пользовтеля"})
  @ApiResponse({status: 200})
  @ApiHeader({
    name: 'JWT',
    required: true
  })
  @RequiredPositions('Admin')
  @UseGuards(PositionGuard)
  @Put(':id/role')
  changeRole(@Param('id') id: number, @Body() role: string) {
    return this.usersService.changeRole(role)
  }

}
