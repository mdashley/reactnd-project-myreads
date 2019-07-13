import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';
import logo from '../icons/logo.svg';

class Shelves extends Component {
  state = {};

  componentDidMount() {
    this.props.onGetAllBooks();
  }

  updateShelves() {
    const currentlyReading = {
      name: 'Currently Reading',
      books: this.props.books.filter(book => book.shelf === 'currentlyReading'),
    };
    const wantToRead = {
      name: 'Want to Read',
      books: this.props.books.filter(book => book.shelf === 'wantToRead'),
    };
    const read = {
      name: 'Read',
      books: this.props.books.filter(book => book.shelf === 'read'),
    };

    return [currentlyReading, wantToRead, read];
  }

  render() {
    let shelves = [];
    if (this.props.books && this.props.books.length) {
      shelves = this.updateShelves();
    }

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <img src={logo} alt="MyReads logo" />
          </div>
          <div className="list-books-content">
            <div>
              {shelves &&
                shelves.map(shelf => (
                  <BookShelf
                    key={shelf.name}
                    shelf={shelf}
                    onChangeBookShelf={this.props.onChangeBookShelf}
                  />
                ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelves;
