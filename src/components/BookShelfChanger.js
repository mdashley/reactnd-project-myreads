import React, { Component } from 'react';

class BookShelfChanger extends Component {
  state = {
    shelfSelection: this.props.book.shelf || 'none',
  };

  changeBookShelf(book, shelf) {
    this.setState({ shelfSelection: shelf });
    this.props.onChangeBookShelf(book, shelf);
  }

  render = () => {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.state.shelfSelection}
          onChange={e => this.changeBookShelf(this.props.book, e.target.value)}
        >
          <option value="" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  };
}

export default BookShelfChanger;
