import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/lib/DTO/books/book.entity';
import { User } from 'src/lib/DTO/auth/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/lib/guards/authGuard';
import { Rate } from 'src/lib/DTO/books/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Rate])],
  controllers: [BooksController],
  providers: [BooksService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }]
})
export class BooksModule {}
