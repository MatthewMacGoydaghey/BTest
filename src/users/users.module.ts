import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/lib/DTO/users/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailVerification } from '../lib/DTO/users/emailVerification';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailVerification]), JwtModule.register({
    global: true,
    secret: 'SECRETIDZE',
    signOptions: {
      expiresIn: '1h' 
    }
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
