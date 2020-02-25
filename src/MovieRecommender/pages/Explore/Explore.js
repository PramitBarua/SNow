import React, { Component } from 'react';
import Axios from 'axios';
import { functionGeneral } from '../../General';
import styles from './Explore.module.scss';
import Search from '../../components/Search/Search';
import Checkbox from '../../components/Checkbox/Checkbox';
import CardSlider from '../../components/CardSlider/CardSlider';
import Loading from '../../components/Loading/Loading';

class Explore extends Component {
  generalFunc = functionGeneral();
  KEY = process.env.REACT_APP_MOVIE_API_KEY;
  baseURL = this.generalFunc.getBaseURL();
  imageURL = this.generalFunc.getImageURL();
  genresMovie = this.generalFunc.getGenre().movie
                .map(genre => {
                  return({...genre, status:false})
                });
    
  genresTv = this.generalFunc.getGenre().tv
              .map(genre => {
                return({...genre, status:false})
              });
  sortByMovie = this.generalFunc.getSortBy().movie;
  sortByTv = this.generalFunc.getSortBy().tv;

  currentYear = new Date().getFullYear();
  years = Array.from({length:100}, (v,k)=> this.currentYear - k);

  userInput = {
    // default inputs
    // type: 'Movie',
    year: this.currentYear,
    sortBy: 'popularity.desc',
    genres: [],
    keyword: ''
    
  }

  state = {
    searchingFor: 'Movie',
    searchResult: [],
    loading:true,
    searchbtnClicked: false,
    errorLoading: false
  }

  // componentDidUpdate() {
  //   console.log('explore.js componentDidUpdate');
    
  //   if (!this.state.loading) {
  //     this.setState({
  //       loading: true
  //     })
  //   }
  // }

  handleKeywordsOnFocus = (e) => {
    e.target.nextElementSibling.classList.add(styles.floating_label_remove);
  }
  
  handleKeywordsOnBlur = (e) => {    
    if (e.target.value === ''){
      e.target.nextElementSibling.classList.remove(styles.floating_label_remove);
    }
  }

  handleKeywordsOnChange = (e) => {
    // console.log('explore.js handleSearchInputOnChange');
    let name = e.target.name;
    let value = e.target.value;
    
    this.userInput = {...this.userInput,[name]:value};    
  }

  handleSelectionChange = (e) => {
    // console.log('explore.js handleSelectionChange');
    let name = e.target.name;

    let value = e.target.value;

    if (name === 'type') {
      this.userInput = {...this.userInput,genres:[]}
      this.setState({
        searchingFor:value
      })
    } else {
      this.userInput = {...this.userInput,[name]:value}
    }
    // console.log(this.userInput);
  }

  handleGenresOnClick = (genreId) => {
    // console.log('explore.js handleGenresOnClick');
    let index = this.userInput['genres'].indexOf(genreId);
    if (index === -1) {
      this.userInput['genres'].push(genreId)
    } else {
      this.userInput['genres'].splice(index, 1);
    }

    // console.log('explore.js handleGenresOnClick this.userInput["genres"]');
    // console.log(this.userInput['genres']);
  }

  handleSearchButtonClick = () => {
    // console.log('explore.js handleSearchButtonClick');

    this.setState({
      searchbtnClicked: true,
      loading: true
    })
    
    let promiseString, searchResult = null;
    if (this.state.searchingFor === 'Movie') {
      promiseString = `${this.baseURL.discover}/movie?api_key=${this.KEY}&sort_by=${this.userInput.sortBy}
      &primary_release_date.gte=${this.userInput.year}-01-01&primary_release_date.lte=${this.userInput.year}-12-31&with_genres=${this.userInput.genres.join(',')}&with_keywords=${this.userInput.keyword}&vote_count.gte=${parseInt(25)}`;
    } else {
      promiseString = `${this.baseURL.discover}/tv?api_key=${this.KEY}&sort_by=${this.userInput.sortBy}&first_air_date.gte=${this.userInput.year}-01-01&first_air_date.lte=${this.userInput.year}-12-31&with_genres=${this.userInput.genres}&with_keywords=${this.userInput.keyword}&vote_count.gte=${parseInt(25)}`;
    }
    //  &year=${parseInt(2011)} primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
    // https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
    // https://api.themoviedb.org/3/discover/tv?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false
    // console.log('explore.js promiseString');
    // console.log(promiseString);
    Axios.get(promiseString)
    .then(response => {
      // console.log('explore.js handleSearchButtonClick response.data.results');
      // console.log(response.data.results)
      if (this.state.searchingFor === 'Movie') {
        searchResult = response.data.results.map(item => {
          item.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${item.poster_path}`;
          
          item.media_type = 'movie';
  
          return {...item}
        })
      } else {
        searchResult = response.data.results.map(item => {
          item.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${item.poster_path}`;
  
          item.media_type = 'tv';
  
          return {...item}
        })
      }
      this.setState({
        searchResult,
        searchbtnClicked: false,
        error: false,
        loading: false
      })      
    })
    .catch(err => {
      // console.log('explore.js promise failed');
      // console.log(err);
      this.setState({
        searchbtnClicked: false,
        error: true,
        loading: false
      })
    })
  }

  
  render() {
    let genres, sortBy, resultJSX = null;    

    if (!this.state.loading) {
      resultJSX = (<CardSlider 
        displayItems={{
          heading:'your search results', 
          data:this.state.searchResult}}
          />)
    } else if ( this.state.searchbtnClicked) {
      resultJSX = <Loading/>
    } else if (this.state.error) {
      resultJSX = <p>Something Went worng. Please try again</p>
    }

    if (this.state.searchingFor === 'Movie') {
      genres = this.genresMovie;
      sortBy = this.sortByMovie;
    } else {
      genres = this.genresTv;
      sortBy = this.sortByTv;
    }
    // console.log('explore.js render this.state.searchingFor');
    // console.log(this.state.searchingFor);
    return (
      <div className={styles.exploreDivContainer}>
        <Search/>
        <form action='' className={styles.exploreForm}>
          <main>
            <section className={styles.sectionLookingFor}>
              {/* type movie/tv or person */}
              <label htmlFor="type">What are you looking for</label>
              <select 
              name='type'
              onChange={(e) => this.handleSelectionChange(e)}>
                <option value="Movie">Movie</option>
                <option value="TV">Series</option>
              </select>
            </section>          
          
            <section className={styles.sectionYear}>
              {/* year */}
              <label htmlFor="year">Year</label>
              <select 
              name='year'
              onChange={(e) => this.handleSelectionChange(e)}>
                {this.years.map((year, index) => {
                  return (<option key={index} value={year}>{year}</option>)
                })}
              </select>
            </section>
            
            <section className={styles.sectionSort}>
              {/* sorted by */}
              <label htmlFor="sort by">Sort By</label>
              <select 
              name='sortBy'
              onChange={(e) => this.handleSelectionChange(e)}>
                {sortBy.map((sort, index) => {
                  return (
                    <option 
                      key={index} 
                      value={sort.id}>
                        {sort.value}
                    </option>)
                })}
              </select>
            </section>
          
            <section className={styles.sectionGenre}>
              {/* Genres */}
              <label htmlFor="genres">Genres</label>
              <div 
              name='genres' 
              className={styles.sectionGenreDiv}>
                <Checkbox
                items={genres}
                searchingFor={this.state.searchingFor}
                rootAction={this.handleGenresOnClick}/>
              </div>
            </section>

            <section className={styles.sectionKeyword}>
              {/* keywords */}
              <label htmlFor="keyword">Keywords</label>              
              <input 
              type="text"
              name='keyword'
              onFocus={(e) => this.handleKeywordsOnFocus(e)}
              onBlur={(e) => this.handleKeywordsOnBlur(e)}
              onChange={(e) => this.handleKeywordsOnChange(e)}/>
              <span className={styles.floating_label}>{'Keywords'}</span>
            </section>
            <button
            type='button'
            onClick={this.handleSearchButtonClick}>Search</button>
          </main>
        </form>
        {resultJSX}
      </div>
    )
  }
}

export default Explore

