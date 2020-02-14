import React, { Component } from 'react';
import Axios from 'axios';

// import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

import { functionGeneral } from '../../General';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './Home.module.scss';


export default class Home extends Component {
  // static contextType = BaseDataContext;

  KEY = functionGeneral().getKey();
  imageURL = functionGeneral().getImageURL();

  state = {
    movies:[],
    series:[],
    loading:true
  }

  componentDidMount() {
    const promiseMovie = Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.KEY}`);
    
    const promiseTV = Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);

    Promise.all([promiseMovie, promiseTV]).then(respose=>{
      // console.log(respose);
      const movies = respose[0].data.results.slice(0,5).map(movie => {
        movie.poster_path = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${movie.poster_path}`;
        movie.backdrop_path = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${movie.backdrop_path}`;
        return {...movie}
      })
      const series = respose[1].data.results.slice(0,5).map(TV => {
        TV.poster_path = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${TV.poster_path}`;
        TV.backdrop_path = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${TV.backdrop_path}`;
        return {...TV}
      })
      // console.log(movies, series)
      this.setState({
        movies,
        series,
        loading: false
      })
    })

  }
  
  render() {
    let movieCards, seriesCards, CardsJSX;

    movieCards = [];
    seriesCards = [];
    
    if (!this.state.loading) {
      [movieCards, seriesCards] = [this.state.movies, this.state.series].map(showitems => {
        return (
          showitems.map(item=>{
            return (
              <MovieCard 
              key={item.id}
              toLink={`/movie/${item.id}`}
              image_path={item.poster_path}
              alt={`poster of ${item.title}`}/>  
            )
          })
        )
      })

      CardsJSX = (
        <>
          <p>Most popular movies</p>
          <div className={styles.cardSliderWrapper}>
            {movieCards}
          </div>
      
          <p>Most popular series</p>
          <div className={styles.cardSliderWrapper}>
            {seriesCards}
          </div>
        </>
      );     
    }

    // console.log(movieCardsJSX);
    
    return (
      <div className={styles.home}>
        {CardsJSX}
      </div>
    )
  }
}
