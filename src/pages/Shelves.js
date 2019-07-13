import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import * as SearchUtil from '../utils/SearchUtil';
import Book from '../components/Book';
import logo from '../icons/logo.svg';

class Shelves extends Component {
  state = {
    books: null,
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksArr => this.setState({ books: booksArr }));
  }

  changeBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(res => {
      let newBookList = this.state.books.slice(0);
      const books = newBookList.filter(listBook => listBook.id === book.id);

      if (books.length) {
        // Update the book that's already on the shelf
        books[0].shelf = shelf;
      } else {
        // Add the book to the shelf and sort the list of books again
        newBookList.push(book);
        newBookList = SearchUtil.sortBooks(newBookList);
      }

      this.setState({ books: newBookList });
    });
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="list-books">
          <div className="list-books-title">
            <img src={logo} alt="MyReads logo" />
          </div>
          {this.state.books ? (
            <div>
              <div className="list-books-content">
                <div className="bookshelf currently-reading">
                  <h2>Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'currentlyReading')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onBookStateChange={this.changeBookShelf.bind(
                                  this
                                )}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2>Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'wantToRead')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onBookStateChange={this.changeBookShelf.bind(
                                  this
                                )}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2>Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'read')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onBookStateChange={this.changeBookShelf.bind(
                                  this
                                )}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          ) : (
            <div className="shelves-loading"></div>
          )}
        </div>
      </div>
    );
  }
}

export default Shelves;
