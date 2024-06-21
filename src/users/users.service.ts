import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/DTO/users/user.entity';
import { UserDTO } from 'src/lib/DTO/users/userDTO';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'
import * as nodemailer from 'nodemailer';
import { JWTpayload } from '../lib/misc';
import { EmailVerification } from '../lib/DTO/users/emailVerification';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UsersRepository: Repository<User>,
    @InjectRepository(EmailVerification) private readonly EmailRepository: Repository<EmailVerification>,
    private jwtService: JwtService
    ) {}



  async regUser(body: UserDTO): Promise<User> {
    let userExists = await this.UsersRepository.findOneBy({email: body.email})
    if (userExists) {
      throw new BadRequestException({message: `User ${body.email} already exists`})
    }
    const newUser = new User()
    newUser.username = body.username
    newUser.email = body.email
    const hashedPassword = await bcryptjs.hash(body.password, 5)
    newUser.password = hashedPassword
    newUser.role = 'test'
    const result = await this.sentVerificationEmail(body.email)
    if (result) {
    const createdUser = await this.UsersRepository.save(newUser)
    return createdUser
    }
    }



  async login(body: UserDTO): Promise<string> {
    let foundUser = await this.UsersRepository.findOneBy({email: body.email})
    if (!foundUser) {
      throw new NotFoundException({message: `User ${body.email} not found`})
    }
    await this.checkEmailVerification(body.email)
    const validPwd = await bcryptjs.compare(body.password, foundUser.password)
    if (!validPwd) {
      throw new ForbiddenException({message: 'Invalid password'})
    }
    const payload: JWTpayload = {
    userID: foundUser.id,
    role: 'Admin'
  }
  return this.generateToken(payload)
  }


  private async checkEmailVerification(email: string) {
    const emailToken = await this.EmailRepository.findOneBy({email})
    if (!emailToken.verified) {
      throw new ForbiddenException({message: 'Email not verified'})
    }
    return true
  }

  private async sentVerificationEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gostyaevartem0@gmail.com',
        pass: '89241912065Art'
      }
    })
    const token = 'test'
    const mailOptions = {
      from: 'gostyaevartem0@gmail.com',
  to: email,
  subject: 'Login-Verification',
  text: token
    }
     const result = await transporter.sendMail(mailOptions)
     if (result) {
    const newEmail = new EmailVerification()
    newEmail.email = email
    newEmail.verified = false
    newEmail.token = token
    await this.EmailRepository.save(newEmail)
    return true
     }
     return false
  }


  async verifyEmail(token: string) {
    const email = await this.EmailRepository.findOneBy({token})
    if (!email) {
      throw new ForbiddenException({message: 'Invalid token'})
    }
    email.verified = true
    await this.EmailRepository.save(email)
    return 'Email has been verified sucessfully'
  }


  async changeRole(role: string) {

  }


  private generateToken(payload: object) {
    return this.jwtService.sign(payload)
  }
}
