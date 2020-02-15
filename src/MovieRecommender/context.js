import React, { Component, createContext } from 'react';
import Axios from 'axios';

import { functionGeneral } from './General';

const DataContext = createContext();

class DataContextProvider extends Component {
  KEY = functionGeneral().getKey();
  imageURL = functionGeneral().getImageURL();
  genreObj = functionGeneral().getGenre();

  state = {
    navLinks: [
      {name: 'Home', linkTo: '/'},
      {name: 'Advance search', linkTo: '/advSearch'},
      {name: 'About', linkTo: '/about'}
    ],
    movies:[],
    series:[],
    navMenuShow:false,
    loading:true,
    loadingFailed: false
  }

  handleMenuShow = () => {
    this.setState({
      navMenuShow: true
    })
  }

  handleMenuHide = () => {
    this.setState({
      navMenuShow: false      
    })
  }

  getClickedShow = (id) => {
    const showMarge = [...this.state.movies, ...this.state.series];
    const targetShow = showMarge.find(showItem => showItem.id === id);
    return targetShow;
  }

  formatGenre = (idArray) => {
    if (idArray){
      let genreArray = idArray.flatMap(id=> {
        return (
          this.genreObj
          .filter(genreItem=>parseInt(genreItem.id) === parseInt(id))
          .map(obj=>obj.name)
        )
      });
      // console.log(genreArray);
      return genreArray;
    }
  }

  componentDidMount() {
    const promiseMovie = Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.KEY}`);
    
    const promiseTV = Axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);

    Promise.all([promiseMovie, promiseTV])
    .then(respose=>{
      console.log('context.js response')
      console.log(respose);
      const movies = respose[0].data.results.slice(0,5).map(movie => {
        movie.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${movie.poster_path}`;
        
        movie.backdropPath = `${this.imageURL.urlBase}${this.imageURL.sizeBackDrop}${movie.backdrop_path}`;          
        
        movie.genre = this.formatGenre(movie.genre_ids);

        return {...movie}
      })
      const series = respose[1].data.results.slice(0,5).map(TV => {
        TV.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${TV.poster_path}`;
       
        TV.backdropPath = `${this.imageURL.urlBase}${this.imageURL.sizeBackDrop}${TV.backdrop_path}`;
       
        TV.genre = this.formatGenre(TV.genre_ids);

        return {...TV}
      })
      // console.log(movies, series);
      this.setState({
        movies,
        series,
        loading: false
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        loading:false,
        loadingFailed: true
      })
    })

  }

  render() {
    return <DataContext.Provider value={
      { ...this.state, 
        handleMenuShow:this.handleMenuShow,
        handleMenuHide:this.handleMenuHide,
        getClickedShow:this.getClickedShow
      }}>
      {this.props.children}
    </DataContext.Provider>
  }
}


// export DataContext;
export {DataContext, DataContextProvider};