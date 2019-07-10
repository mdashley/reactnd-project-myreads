import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

class MainPage extends Component {
  state = {
    books: null,
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksArr => this.setState({ books: booksArr }));
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {this.state.books && (
            <div>
              <div className="list-books-content">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'currentlyReading')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                title={book.title}
                                cover={book.imageLinks.thumbnail}
                                author={book.authors[0]}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'wantToRead')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                title={book.title}
                                cover={book.imageLinks.thumbnail}
                                author={book.authors[0]}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter(book => book.shelf === 'read')
                        .map(book => {
                          return (
                            <li key={book.id}>
                              <Book
                                title={book.title}
                                cover={book.imageLinks.thumbnail}
                                author={book.authors[0]}
                              />
                            </li>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.props.history.push('/search')}>
                  Add a book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
