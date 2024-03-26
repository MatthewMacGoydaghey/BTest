import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/DTO/auth/user.entity';
import { UserDTO } from 'src/lib/DTO/auth/userDTO';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UsersRepository: Repository<User>,
    private jwtService: JwtService
    ) {}



  async regUser(body: UserDTO): Promise<String> {
    let userExists = await this.UsersRepository.findOneBy({userName: body.userName})
    if (userExists) {
      throw new BadRequestException({message: `User ${body.userName} already exists`})
    }
    const newUser = new User()
    newUser.userName = body.userName
    newUser.password = body.password
    const createdUser = await this.UsersRepository.save(newUser)
    const payload = {
    userId: createdUser.id
    }
    return this.generateToken(payload)
    }



  async login(body: UserDTO): Promise<string> {
    let foundUser = await this.UsersRepository.findOneBy({userName: body.userName})
    if (!foundUser) {
      throw new NotFoundException({message: `User ${body.userName} not found`})
    }
    const payload = {
    userId: foundUser.id
  }
  return this.generateToken(payload)
  }



  private generateToken(payload: object) {
    return this.jwtService.sign(payload)
  }
}
