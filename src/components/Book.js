import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
  changeBookShelf = (book, shelf) => {
    // Trigger the API call in the parent component
    this.props.onChangeBookShelf(book, shelf);
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                this.props.book.imageLinks
                  ? this.props.book.imageLinks.thumbnail
                  : null
              })`,
            }}
          ></div>
          <BookShelfChanger
            book={this.props.book}
            onChangeBookShelf={this.changeBookShelf}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors ? this.props.book.authors[0] : ''}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
