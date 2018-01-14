import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksGrid: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(booksGrid => {
      this.setState({ booksGrid });
    });
  }

  checkCurrentList = (book) => {
    const bookOnState = this.state.booksGrid.filter(bookGrid => {
      if (bookGrid.id === book.id) {
        return bookGrid;
      }
    });

    return (bookOnState.length > 0) ? bookOnState[0].shelf : 'none';
  }

  findBook = (id) => {
    if (!id.length) {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(id).then(books => {
      if (books.error === 'empty query') return;

      this.setState({ books });
    });
  }

  onRead = (e, book) => {
    e.persist();

    BooksAPI.update(book, e.target.value).then(data => {
      let newBooksGrid;
      if (!book.shelf) {
        newBooksGrid = this.state.booksGrid;
        book.shelf = e.target.value;
        newBooksGrid.push(book);
      } else {
        newBooksGrid = this.state.booksGrid.map(item => {
          if(item.id === book.id) item.shelf = e.target.value;

          return item;
        });
      }

      this.setState(state => ({
        booksGrid: newBooksGrid
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBooks
            booksGrid={this.state.booksGrid}
            onRead={(e, book) => this.onRead(e, book)}
            checkCurrentList={(book) => this.checkCurrentList(book)}
          />}
        />

        <Route path='/search' render={() => <Search
          books={this.state.books}
          findBook={(id) => this.findBook(id)}
          onRead={(e, book) => this.onRead(e, book)}
          checkCurrentList={(book) => this.checkCurrentList(book)}
          />}
        />
      </div>
    )
  }
}

export default BooksApp
