import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Search.module.scss';

const KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/multi?';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      cursor: 0,
      searchShow: false,
    };

    this.selectRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.selectRef.current) {
      if (this.selectRef.current.innerHTML !== '') {
        this.selectRef.current.focus();
      } else if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    }
  }

  removeSeachResults = () => {
    this.setState({
      searchShow: false,
    });
  };

  handleSearchInputOnFocus = (e) => {
    e.target.parentElement.classList.add(styles.inputWrapperOnfocus);
    e.target.previousElementSibling.classList.add(
      styles.floating_label_onfocus
    );
  };

  handleSearchInputOnBlur = (e) => {
    e.target.parentElement.classList.remove(styles.inputWrapperOnfocus);
    if (e.target.value === '') {
      e.target.previousElementSibling.classList.remove(
        styles.floating_label_onfocus
      );
      this.removeSeachResults();
    }
  };

  handleSearchInputOnChange = (e) => {
    let query, quickresults;

    query = e.target.value;

    if (query !== '') {
      axios
        .get(
          `${API_URL}api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then((response) => {
          quickresults = response.data.results.map((result) => {
            if (result.media_type === 'person' || result.media_type === 'tv') {
              return {
                id: result.id,
                type: result.media_type,
                title: result.name,
              };
            }
            return {
              id: result.id,
              type: result.media_type,
              title: result.title,
            };
          });
          quickresults = quickresults.filter((result) => {
            return result.title.toLowerCase().includes(query.toLowerCase());
          });

          this.setState({
            results: [
              { id: null, type: null, title: null },
              ...quickresults.slice(0, 5),
            ],
            cursor: 0,
            searchShow: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            results: [],
            cursor: 0,
            searchShow: false,
          });
        });
    } else {
      this.setState({
        results: [],
        cursor: 0,
        searchShow: false,
      });
    }
  };

  handleArrowKey = (e) => {
    console.log('handleArrowKey');

    const { cursor, results } = this.state;

    if (e.keyCode === 38 && cursor > 0) {
      // pressed up arrow key
      e.preventDefault();

      this.setState((prevState) => ({
        ...prevState,
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      // pressed down arrow key
      e.preventDefault();
      this.setState((prevState) => ({
        ...prevState,
        cursor: prevState.cursor + 1,
      }));
    }
  };

  render() {
    let suggestions = null;
    let highlightId;

    if (this.state.searchShow && this.state.results.length > 0) {
      highlightId = this.state.results[this.state.cursor].id;
      suggestions = (
        <ul className={styles.suggestions} onKeyDown={this.handleArrowKey}>
          {this.state.results.map((r) => {
            return (
              <li key={r.id}>
                <Link
                  to={`/${r.type}/${r.id}`}
                  onClick={this.removeSeachResults}
                  ref={r.id === highlightId ? this.selectRef : null}
                >
                  {r.title}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className={styles.inputWrapper}>
        <form className={styles.inputform}>
          <span className={styles.floating_label}>
            Search Movie, TV Series or Person...
          </span>
          <input
            type="text"
            ref={this.inputRef}
            onFocus={this.handleSearchInputOnFocus}
            onBlur={this.handleSearchInputOnBlur}
            onChange={this.handleSearchInputOnChange}
            onKeyUp={this.handleArrowKey}
          />
        </form>
        {suggestions}
      </div>
    );
  }
}
