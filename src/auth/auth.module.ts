import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/lib/DTO/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: 'SECRETIDZE',
    signOptions: {
      expiresIn: '1h' 
    }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}