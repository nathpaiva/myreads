import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GridBooks from './GridBooks';
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    booksGrid: PropTypes.array.isRequired,
    onRead: PropTypes.func.isRequired
  };

  render() {
    const currentlyReading = this.props.booksGrid.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.props.booksGrid.filter(book => book.shelf === 'wantToRead');
    const read = this.props.booksGrid.filter(book => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <GridBooks books={currentlyReading} onRead={this.props.onRead} title="Currently Reading" />
            </div>
            <div className="bookshelf">
              <GridBooks books={wantToRead} onRead={this.props.onRead} title="Want To Read" />
            </div>
            <div className="bookshelf">
              <GridBooks books={read} onRead={this.props.onRead} title="Read" />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' />
        </div>
      </div>
    )
  }
}

export default ListBooks;
