import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../BooksAPI';
import * as SearchUtil from '../utils/SearchUtil';

class Search extends Component {
  state = {
    query: '',
    books: [],
  };

  queryTimeout = null;

  componentDidMount() {
    if (!this.props.currentBooks) {
      this.props.onGetAllBooks();
    }
  }

  handleQueryChange = val => {
    clearTimeout(this.queryTimeout);
    this.setState({ query: val });
    this.queryTimeout = setTimeout(this.updateSearch, 250);
  };

  updateSearch = () => {
    // Do NOT search if query is empty
    if (this.state.query === '') {
      this.setState({ error: false, books: [] });
      return;
    }

    BooksAPI.search(this.state.query).then(res => {
      let newBookList = [];
      let newSearchError = false;

      if (res === undefined || (res.error && res.error !== 'empty query')) {
        newSearchError = true;
      } else if (res.length) {
        // Handle books that were already on one of the user's shelves
        newBookList = SearchUtil.mergeShelfAndSearch(
          this.props.currentBooks,
          res
        );
        newBookList = SearchUtil.sortBooks(newBookList);
      }

      this.setState({ error: newSearchError, books: newBookList });
    });
  };

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
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.handleQueryChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
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

export default Search;
