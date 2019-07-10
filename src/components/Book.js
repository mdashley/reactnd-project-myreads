import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    shelfSelection: 'none',
  };

  componentDidMount() {
    this.setState({ shelfSelection: this.props.book.shelf });
  }

  onChangeShelf = (book, shelf) => {
    // Set the state for the shelf selection
    this.setState({ shelfSelection: shelf });

    // Trigger the API call in the parent component
    this.props.onBookStateChange(book, shelf);
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
          <div className="book-shelf-changer">
            <select
              value={this.state.shelfSelection}
              onChange={e =>
                this.onChangeShelf(this.props.book, e.target.value)
              }
            >
              >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
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
