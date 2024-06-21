import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/lib/DTO/books/book.entity';
import { User } from 'src/lib/DTO/users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/lib/guards/authGuard';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BooksController],
  providers: [BooksService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }]
})
export class BooksModule {}
