import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import * as SearchUtil from '../utils/SearchUtil';

class Search extends Component {
  state = {
    query: '',
    books: [],
  };

  queryTimeout = null;

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
        newBookList = SearchUtil.mergeShelfAndSearch([], res);
        newBookList = SearchUtil.sortBooks(newBookList);
      }

      this.setState({ error: newSearchError, books: newBookList });
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.push('/')}
          >
            Close
          </button>
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
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default Search;
