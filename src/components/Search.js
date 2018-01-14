import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Books';

class Search extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onRead: PropTypes.func.isRequired,
    checkCurrentList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const debounce = this.debounce;
    this.updateQuery = debounce(() => {
      this.search();
    }, 280);
  }

  state = {
    query: '',
  }

  debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  search = () => {
    this.props.findBook(this.state.query);
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
              onChange={(event) => {
                this.setState({query: event.target.value});
                this.updateQuery();
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Books books={this.props.books}
            onRead={this.props.onRead}
            checkCurrentList={(book) => this.props.checkCurrentList(book)} />
        </div>
      </div>
    )
  }
}

export default Search;
