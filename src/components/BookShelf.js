import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import Book from './Book';

class BookShelf extends Component {
  render() {
    return (
      <div
        className={
          'bookshelf ' +
          (this.props.shelf.name === 'Currently Reading'
            ? 'currently-reading'
            : '')
        }
      >
        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelf.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeBookShelf={this.props.onChangeBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
