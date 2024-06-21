import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUserDTO } from 'src/lib/DTO/users/currentUserDTO';
import { User } from 'src/lib/DTO/users/user.entity';
import { Book } from 'src/lib/DTO/books/book.entity';
import { BookDTO } from 'src/lib/DTO/books/bookDTO';
import { UpdateBookDTO } from 'src/lib/DTO/books/updateBookDTO';
import { Repository } from 'typeorm';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly BooksRepository: Repository<Book>
  ) {}



  async findBooks() {
    const booksArray = await this.BooksRepository.find()
    return booksArray

  }


  async findBook(bookID: number) {
    const foundBook = await this.BooksRepository.findOneBy({id: bookID})
    if (!foundBook) {
      throw new NotFoundException({message: `Book with ID ${bookID} not found`})
    }
    return foundBook
  }



  async createBook(body: BookDTO) {
    const newBook = new Book()
    newBook.title = body.title
    newBook.generes = body.generes
    return this.BooksRepository.save(newBook)
  }



  async updateBook(bookID: number, updateBody: UpdateBookDTO) {
    const foundBook = await this.findBook(bookID)
    foundBook.title = updateBody.title
    foundBook.author = updateBody.author
    foundBook.generes = updateBody.generes
    foundBook.publicationDate = updateBody.publicationDate
    return this.BooksRepository.save(foundBook)
  }



  async deleteBook(bookID: number) {
    await this.findBook(bookID)
    const deleted = await this.BooksRepository.delete({id: bookID})
    return `Book with ID ${bookID} has been deleted`
  }
}
