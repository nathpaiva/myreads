import React from 'react';
import { Link } from 'react-router-dom';
import GridBooks from './GridBooks';
import PropTypes from 'prop-types';

const ListBooks = ({booksGrid, onRead}) => {
  const currentlyReading = booksGrid.filter(book => book.shelf === 'currentlyReading');
  const wantToRead = booksGrid.filter(book => book.shelf === 'wantToRead');
  const read = booksGrid.filter(book => book.shelf === 'read');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <GridBooks books={currentlyReading} onRead={onRead} title="Currently Reading" />
          </div>
          <div className="bookshelf">
            <GridBooks books={wantToRead} onRead={onRead} title="Want To Read" />
          </div>
          <div className="bookshelf">
            <GridBooks books={read} onRead={onRead} title="Read" />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to='/search' />
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  booksGrid: PropTypes.array.isRequired,
  onRead: PropTypes.func.isRequired
};

export default ListBooks;
