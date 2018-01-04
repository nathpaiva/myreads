import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
      const wantToRead = books.filter(book => book.shelf === 'wantToRead');
      const read = books.filter(book => book.shelf === 'read');

      this.setState({ currentlyReading, wantToRead, read });
    });
  }

  findBook = (id) => {
    BooksAPI.search(id).then(books => {
      if (books.error === 'empty query') return;

      this.setState({ books });
    });
  }

  onRead = (e, book) => {
    e.persist();

    BooksAPI.update(book, e.target.value).then(data => {
      const oldShelf = book.shelf;

      if (e.target.value === 'none' || oldShelf) {
        const newListOfCurrentShelf = this.state[book.shelf].filter(item => item.id !== book.id);
        this.setState(state => ({
          [oldShelf]: newListOfCurrentShelf,
        }));
      }

      if (e.target.value !== 'none') {
        book.shelf = e.target.value;
        this.setState(state => ({
          [e.target.value]: state[e.target.value].concat([book])
        }));
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBooks
          currentlyReading={this.state.currentlyReading}
          wantToRead={this.state.wantToRead}
          read={this.state.read}
          onRead={(e, book) => this.onRead(e, book)} />} />

        <Route path='/search' render={() => <Search
          books={this.state.books}
          findBook={(id) => this.findBook(id)}
          onRead={(e, book) => this.onRead(e, book)} />} />
      </div>
    )
  }
}

export default BooksApp
