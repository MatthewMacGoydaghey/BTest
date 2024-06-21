import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from 'src/lib/DTO/books/bookDTO';
import { Public } from 'src/lib/DTO/users/constants';
import { UpdateBookDTO } from 'src/lib/DTO/books/updateBookDTO';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/lib/DTO/books/book.entity';
import { PositionGuard, RequiredPositions } from '../lib/guards/postitonGuard';


@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly BooksService: BooksService
  ) {}



  @ApiOperation({summary: "Возвращает массив книг"})
  @ApiResponse({status: 200, type: [Book]})
  @Public()
  @Get()
  findBooks() {
    return this.BooksService.findBooks()
  }



  @ApiOperation({summary: "Возвращает одну книгу по ID"})
  @ApiResponse({status: 200, type: Book})
  @Public()
  @Get(':id')
  findBook(@Param('id', ParseIntPipe) id: number) {
    return this.BooksService.findBook(id)
  }



  @ApiOperation({summary: "Создаёт книгу"})
  @ApiResponse({status: 201, type: Book})
  @ApiHeader({
    name: 'JWT',
    required: true
  })
  @RequiredPositions('Admin')
  @UseGuards(PositionGuard)
  @Post()
  createBook(@Body() body: BookDTO) {
    return this.BooksService.createBook(body)
  }



  @ApiOperation({summary: "Обновляет выбранные параметры книги"})
  @ApiResponse({status: 201, type: Book})
  @ApiHeader({
    name: 'JWT',
    required: true
  })
  @RequiredPositions('Admin')
  @UseGuards(PositionGuard)
  @Put(':id')
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() updateBody: UpdateBookDTO) {
    return this.BooksService.updateBook(id, updateBody)
  }


  
  @ApiOperation({summary: "Удаляет книгу по ID"})
  @ApiResponse({status: 200})
  @ApiHeader({
    name: 'JWT',
    required: true
  })
  @RequiredPositions('Admin')
  @UseGuards(PositionGuard)
  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.BooksService.deleteBook(id)
  }
}
