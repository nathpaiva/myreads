import React from 'react';
import Books from './Books';

const GridBooks = ({ title ,books, onRead }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <Books books={books} onRead={onRead} />
      </div>
    </div>
  );
}

export default GridBooks;
