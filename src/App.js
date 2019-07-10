import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';

import Shelves from './pages/Shelves';
import Search from './pages/Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Shelves} />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
