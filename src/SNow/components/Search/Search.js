import React, { Component } from 'react';
import axios from 'axios';

import styles from './Search.module.scss';
import Suggestions from '../Suggestions/Suggestions';

const KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/search/multi?';

export default class Search extends Component {
  state = {
    results: [],
    cursor: 0,
    searchShow: false,
  };

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

    if (query.length > 1) {
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
            results: quickresults.slice(0, 5),
            searchShow: true,
          });
        });
    } else {
      this.setState({
        results: [],
        searchShow: false,
      });
    }
  };

  handleKeyDown(e) {
    const { cursor, results } = this.state;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1,
      }));
    }
  }

  render() {
    let suggestions = this.state.searchShow ? (
      <Suggestions
        className={styles.searchSuggestion}
        resutls={this.state.results}
        onFocus={this.state.searchShow}
        removeResults={this.removeSeachResults}
      />
    ) : null;

    return (
      <div className={styles.inputWrapper}>
        <form className={styles.inputform}>
          <span className={styles.floating_label}>
            Search Movie, TV Series or Person...
          </span>
          <input
            type="select"
            onFocus={(e) => this.handleSearchInputOnFocus(e)}
            onBlur={(e) => this.handleSearchInputOnBlur(e)}
            onChange={(e) => this.handleSearchInputOnChange(e)}
          />
        </form>
        {suggestions}
      </div>
    );
  }
}
