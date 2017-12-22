import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
      const wantToRead = books.filter(book => book.shelf === 'wantToRead');
      const read = books.filter(book => book.shelf === 'read');

      this.setState({ currentlyReading, wantToRead, read });
    });
  }

  onRead = (e, book) => {
    e.persist();
    BooksAPI.update(book, e.target.value).then(data => {
      const oldShelf = book.shelf;
      const newListOfCurrentShelf = this.state[book.shelf].filter(item => item.id !== book.id);
      book.shelf = e.target.value;

      this.setState(state => ({
        [e.target.value]: state[e.target.value].concat([book]),
        [oldShelf]: newListOfCurrentShelf,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={Search} />
        <Route exact path='/' render={() => <ListBooks
          currentlyReading={this.state.currentlyReading}
          wantToRead={this.state.wantToRead}
          read={this.state.read}
          onRead={(e, book) => this.onRead(e, book)} />} />
      </div>
    )
  }
}

export default BooksApp
