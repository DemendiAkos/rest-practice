import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {Book } from './entities/book.entity'

@Injectable()
export class BooksService {

  private books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      publishYear: 1925,
      reserved: false,
    },
    {
      id: 2,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      isbn: '9780307474278',
      publishYear: 2003,
      reserved: true,
    },
    {
      id: 3,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '9780316769488',
      publishYear: 1951,
      reserved: false,
    }
  ];

  private nextId = this.books.length + 1;

  create(createBookDto: CreateBookDto) {
    const newBook = {
      id: this.nextId,
      ...createBookDto,
      reserved: false
    };

    this.books.push(newBook);
    this.nextId++;
    return newBook
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find(book => book.id === id);
  }

  
  
  remove(id: number) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id #${id} not found`);
    }
    this.books.splice(bookIndex, 1);

    this.books.forEach((book, index) => {
      book.id = index + 1;
    });
    
    this.nextId = this.books.length + 1;
  }


  update(id: number, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id #${id} not found`);
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookDto
    };

    return {
      data: this.books,
      statusCode: 200,
      message: 'Book Patched'
    } 
  }


}



