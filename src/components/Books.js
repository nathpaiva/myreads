import React from 'react';
import PropTypes from 'prop-types'

const Book = ({ books, onRead }) => {
  return (
    <ol className="books-grid">
      {books.map(book => <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={typeof book.shelf === 'undefined' ? 'none' : book.shelf} onChange={(e) => onRead(e, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {!!book.authors && book.authors.map((author, i) => <div key={i} className="book-authors">
            {author}
          </div>)}
        </div>
      </li>)}
    </ol>
  );
};

Book.propTypes = {
  books: PropTypes.array.isRequired,
  onRead: PropTypes.func.isRequired
};

export default Book;
