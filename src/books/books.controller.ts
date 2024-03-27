import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from 'src/lib/DTO/books/bookDTO';
import { User } from 'src/lib/decorators/currentUser';
import { CurrentUserDTO } from 'src/lib/DTO/auth/currentUserDTO';
import { Public } from 'src/lib/DTO/auth/constants';
import { UpdateBookDTO } from 'src/lib/DTO/books/updateBookDTO';
import { RateDTO } from 'src/lib/DTO/books/rateDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/lib/DTO/books/book.entity';
import { Rate } from 'src/lib/DTO/books/rate.entity';


@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly BooksService: BooksService
  ) {}



  @ApiOperation({summary: "Возвращает массив книг в зависимости от заданных параметров"})
  @ApiResponse({status: 200, type: [Book]})
  @Public()
  @Get()
  getBooks(@Query('skip') skip: number, @Query('take') take: number, @Body() filters: UpdateBookDTO) {
    const pagination = {
      skip: skip | 0,
      take: take | 0
    }
    return this.BooksService.findBooks(pagination, filters)
  }



  @ApiOperation({summary: "Возвращает одну книгу по ID"})
  @ApiResponse({status: 200, type: Book})
  @Public()
  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number) {
    return this.BooksService.findBook(id)
  }



  @ApiOperation({summary: "Создаёт книгу"})
  @ApiResponse({status: 201, type: Book})
  @Post()
  createBook(@Body() body: BookDTO) {
    return this.BooksService.createBook(body)
  }



  @ApiOperation({summary: "Обновляет выбранные параметры книги"})
  @ApiResponse({status: 201, type: Book})
  @Put(':id')
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() updateBody: UpdateBookDTO) {
    return this.BooksService.updateBook(id, updateBody)
  }


  
  @ApiOperation({summary: "Удаляет книгу по ID"})
  @ApiResponse({status: 200})
  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.BooksService.deleteBook(id)
  }


  @ApiOperation({summary: "Создаёт оценку в таблице rate с внешними ключами на оценённую книгу и оценившего пользователя"})
  @ApiResponse({status: 201, type: Rate})
  @Patch('/rate/:id')
  rateBook(@Param('id', ParseIntPipe) id: number, @Body() rate: RateDTO, @User() user: CurrentUserDTO) {
    return this.BooksService.rateBook(id, rate, user)
  }

}
