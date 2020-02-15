import React, { Component } from 'react';
import axios from 'axios';
import { functionGeneral } from '../../General';

import styles from './Search.module.scss';
import Suggestions from '../Suggestions/Suggestions';

const KEY = functionGeneral().getKey();
const API_URL = 'https://api.themoviedb.org/3/search/multi?';



export default class Search extends Component {

  state = {
    results: [],
    cursor: 0
  }

  handleSearchInputOnFocus = (e) => {
    e.target.parentElement.classList.add(styles.inputWrapperOnfocus);
    e.target.previousElementSibling.classList.add(styles.floating_label_onfocus);
  }
  
  handleSearchInputOnBlur = (e) => {
    e.target.parentElement.classList.remove(styles.inputWrapperOnfocus);
    if (e.target.value === ''){
      e.target.previousElementSibling.classList.remove(styles.floating_label_onfocus);
    }
  }
  
  handleSearchInputOnChange = (e) => {
    console.log('home.js handleSearchInputOnChange');
    console.log(e.target.value);
    let query = e.target.value
    if (query.length > 1) {
      axios.get(`${API_URL}api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(response => {
        console.log(response.data.results.slice(0,4));
        let quickresults = response.data.results.slice(0,5).map(result => {
          if (result.media_type === 'person' || result.media_type === 'tv') {
            return {id:result.id, type:result.media_type, title:result.name}
          }
          return {id:result.id, type:result.media_type, title:result.title}
        })
        console.log('home.js quickresults');
        console.log(quickresults);
        this.setState({
          results: quickresults
        })
      })
    } else {
      this.setState({
        results: []
      })
    }
  }

  handleKeyDown(e) {

    const { cursor, results } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
     }
  }
  // }

  render() {
    return (
      <>
        <form className={styles.inputWrapper}>
          <span className={styles.floating_label}>Search Movie, TV Series or Actor...</span>
          <input type="select"
          className={styles.homeInput}
          onFocus={(e) => this.handleSearchInputOnFocus(e)}
          onBlur={(e) => this.handleSearchInputOnBlur(e)}
          onChange={(e) => this.handleSearchInputOnChange(e)}
          onKeyDown={(e) => this.handleSearchInputOnChange(e)}
          />
          
        </form>
        <Suggestions 
          className={styles.searchSuggestion}
          resutls={this.state.results}/>
      </>
    )
  }
}
