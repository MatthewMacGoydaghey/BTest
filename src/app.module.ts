import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { User } from './lib/DTO/users/user.entity';
import { Book } from './lib/DTO/books/book.entity';
import { UsersModule } from './users/users.module';
import { EmailVerification } from './lib/DTO/users/emailVerification';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, EmailVerification, Book],
    synchronize: true,
  }), UsersModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
