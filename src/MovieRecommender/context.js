import React, { Component, createContext } from 'react';
import Axios from 'axios';

import { functionGeneral } from './General';

const DataContext = createContext();

class DataContextProvider extends Component {
  KEY = functionGeneral().getKey();
  imageURL = functionGeneral().getImageURL();
  genreObj = functionGeneral().getGenre();
  baseURL = functionGeneral().getBaseURL();

  state = {
    navLinks: [
      {name: 'Home', linkTo: '/'},
      {name: 'Advance search', linkTo: '/advSearch'},
      {name: 'About', linkTo: '/about'}
    ],
    movies:[],
    series:[],
    persons:[],
    singleMovie: {},
    singleTV: {},
    singlePerson: {},
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

  getClickedShow = (type, id) => {
    let show;
    if (type === 'movie') {
      show = [...this.state.movies];
    } else if (type === 'tv') {
      show = [...this.state.series];
    } else {
      show = [...this.state.persons];
    }
    const targetShow = show.find(showItem => showItem.id === id);
    return targetShow;
  }

  setClickedShow = (type, id) => {
    let data = {};
    let previousdata;

    
    const url = `${this.baseURL.byId}/${type}/${id}?api_key=${this.KEY}&language=en-US`
    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

    Axios.get(url)
    .then(response => {
      console.log('context.js setClickedShow response');
      console.log(response);
      data = {...response.data};
      data.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${data.poster_path}`;
        
      data.backdropPath = `${this.imageURL.urlBase}${this.imageURL.sizeBackDrop}${data.backdrop_path}`;          
      
      // data.genre = this.formatGenre(data.genre_ids);
      if (type === 'movie' || type === 'tv') {
        data.genre = data.genres.map(genre => genre.name)
      }
      console.log('context.js data');
      console.log(data);

      if (type==='movie') {
        previousdata = [...this.state.movies, data];
        this.setState({
          movies:previousdata
        })
      } else if (type==='tv') {
        previousdata = [...this.state.series, data];
        this.setState({
          series:previousdata
        })
      } else{
        previousdata = [...this.state.persons, data];
        this.setState({
          persons:previousdata
        })
      }
      
    })
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
    const promiseMovie = Axios.get(`${this.baseURL.discoverMovies}api_key=${this.KEY}`);
    
    const promiseTV = Axios.get(`${this.baseURL.discoverTVs}api_key=${this.KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);

    Promise.all([promiseMovie, promiseTV])
    .then(respose=>{
      console.log('context.js response')
      console.log(respose);
      const movies = respose[0].data.results.slice(0,6).map(movie => {
        movie.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${movie.poster_path}`;
        
        movie.backdropPath = `${this.imageURL.urlBase}${this.imageURL.sizeBackDrop}${movie.backdrop_path}`;          
        
        movie.genre = this.formatGenre(movie.genre_ids);

        movie.media_type = 'movie';

        return {...movie}
      })
      const series = respose[1].data.results.slice(0,6).map(TV => {
        TV.posterPath = `${this.imageURL.urlBase}${this.imageURL.sizePoster}${TV.poster_path}`;
       
        TV.backdropPath = `${this.imageURL.urlBase}${this.imageURL.sizeBackDrop}${TV.backdrop_path}`;
       
        TV.genre = this.formatGenre(TV.genre_ids);

        TV.media_type = 'tv';

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
        getClickedShow:this.getClickedShow,
        setClickedShow:this.setClickedShow
      }}>
      {this.props.children}
    </DataContext.Provider>
  }
}


// export DataContext;
export {DataContext, DataContextProvider};