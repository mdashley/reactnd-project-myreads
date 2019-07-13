import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import * as SearchUtil from './utils/SearchUtil';
import './App.css';

import Shelves from './pages/Shelves';
import Search from './pages/Search';

class BooksApp extends React.Component {
  state = {};

  getAllBooks() {
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
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves
              books={this.state.books}
              onChangeBookShelf={this.changeBookShelf.bind(this)}
              onGetAllBooks={this.getAllBooks.bind(this)}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              currentBooks={this.state.books}
              onChangeBookShelf={this.changeBookShelf.bind(this)}
              onGetAllBooks={this.getAllBooks.bind(this)}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
