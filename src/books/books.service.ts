import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUserDTO } from 'src/lib/DTO/auth/currentUserDTO';
import { User } from 'src/lib/DTO/auth/user.entity';
import { Book } from 'src/lib/DTO/books/book.entity';
import { BookDTO } from 'src/lib/DTO/books/bookDTO';
import { Rate } from 'src/lib/DTO/books/rate.entity';
import { RateDTO } from 'src/lib/DTO/books/rateDTO';
import { UpdateBookDTO } from 'src/lib/DTO/books/updateBookDTO';
import { Repository } from 'typeorm';


interface Pagination {
  skip: number,
  take: number
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly BooksRepository: Repository<Book>,
    @InjectRepository(User) private readonly UsersRepository: Repository<User>,
    @InjectRepository(Rate) private readonly RatesRepository: Repository<Rate>
  ) {}



  async findBooks(pagination: Pagination, filters: UpdateBookDTO) {
    const { take, skip } = pagination
    const booksArray = await this.BooksRepository.find({take, skip})
    const filteredBooks = await this.filterBooks(booksArray, filters)
  return filteredBooks
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
    newBook.authors = body.authors
    const currentYear = new Date().getFullYear()
    newBook.year = currentYear
    newBook.generes = body.generes
    return this.BooksRepository.save(newBook)
  }



  async updateBook(bookID: number, updateBody: UpdateBookDTO) {
    const foundBook = await this.findBook(bookID)
    if (!foundBook) {
      throw new NotFoundException({message: `Book with ID ${bookID} not found`})
    }
    foundBook.title = updateBody.title || foundBook.title
    foundBook.authors = updateBody.authors || foundBook.authors
    foundBook.generes = updateBody.generes || foundBook.generes
    foundBook.year = updateBody.year || foundBook.year
    return this.BooksRepository.save(foundBook)
  }



  async deleteBook(bookID: number) {
    await this.findBook(bookID)
    const deleted = await this.BooksRepository.delete({id: bookID})
    return `Book with ID ${bookID} has been deleted`
  }



  async rateBook(bookID: number, rate: RateDTO, user: CurrentUserDTO) {
    const foundBook = await this.findBook(bookID)
    const foundUser = await this.UsersRepository.findOneBy({id: user.userID})
    const newRate = new Rate()
    newRate.book = foundBook
    newRate.user = foundUser
    newRate.rate = rate.rate
    const rated = await this.RatesRepository.save(newRate)
    const responseObject = {
      book: rated.book.title,
      rate: rated.rate
    }
    return responseObject
  }


  
  private async filterBooks(booksArray: object[], filters: UpdateBookDTO) {
    const filteredBooks = []
    booksArray.filter(book => {
    for (let key in filters) {
    if (Array.isArray(filters[key])) {
    if (!filters[key].every(value => book[key].includes(value))) {
    return false
     }}
    else {
    if (book[key] !== filters[key]) {
    return false
    }}}
      filteredBooks.push(book)
    })
      return filteredBooks
    }
}
