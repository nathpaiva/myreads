import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Books';

class Search extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onRead: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  }

  updateQuery = q => {
    this.setState({query: q});
    this.props.findBook(q);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" />
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Books books={this.props.books}
            onRead={this.props.onRead} />
        </div>
      </div>
    )
  }
}

export default Search;
