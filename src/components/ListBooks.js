import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ViewBooks from './ViewBooks';
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <ViewBooks books={this.props.currentlyReading} title="Currently Reading" />
            </div>
            <div className="bookshelf">
              <ViewBooks books={this.props.wantToRead} title="Want To Read" />
            </div>
            <div className="bookshelf">
              <ViewBooks books={this.props.read} title="Read" />
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
