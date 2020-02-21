import React, { Component } from 'react';
import Axios from 'axios';

import defaultPoster from '../../assets/images/no_poster_found.png';

import styles from './SinglePage.module.scss';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import { functionGeneral } from '../../General';


class SinglePage extends Component {
  state = {
    loading: true,
    data: {}
  }

  getData = () => {
    const baseURL = functionGeneral().getBaseURL();
    const imageURL = functionGeneral().getImageURL();
    const KEY = functionGeneral().getKey();
    const id = this.props.match.params.id;
    const media_type = this.props.match.params.media_type;

    let data = {};

    const url = `${baseURL.byId}/${media_type}/${id}?api_key=${KEY}&language=en-US`
    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

    Axios.get(url)
    .then(response => {
      console.log('singlePage.js getData response');
      console.log(response);
      data = {...response.data};

      console.log('singlePage.js getData data.poster_path');
      console.log(data.poster_path);
      
      
        
      data.backdropPath = data.backdrop_path ? `${imageURL.urlBase}${imageURL.sizeBackDrop}${data.backdrop_path}` : null;

      data.media_type = media_type;
      
      // data.genre = this.formatGenre(data.genre_ids);
      if (media_type === 'movie' || media_type === 'tv') {
        data.title = data.title ? data.title : data.name;
        data.posterPath = data.poster_path ? `${imageURL.urlBase}${imageURL.sizePoster}${data.poster_path}` : defaultPoster;
        data.releaseDate = data.release_date ? data.release_date : data.first_air_date;
        data.avgVote = data.vote_average ? data.vote_average : null;
        data.runtime = data.runtime ? data.runtime : data.episode_run_time
        data.genre = data.genres.map(genre => genre.name);
        
      } else {
        data.posterPath = data.profile_path ? `${imageURL.urlBase}${imageURL.sizePoster}${data.profile_path}`: defaultPoster;
        data.homepage = data.homepage ? data.homepage : '-'
        
      }
      console.log('SinglePage.js data');
      console.log(data);

      this.setState({
        data,
        loading:false
      })
    })
    .catch(err=>{
      console.log(err);
      this.setState({
        loading:false
      })
    })
  }

  componentDidMount() {
    console.log('singlePage.js componentDidMount');
    this.getData();
  }

  componentDidUpdate(prevProps) {
    console.log('singlePage.js componentDidUpdate');

    if (this.props.match.params.media_type === prevProps.match.params.media_type && this.props.match.params.id === prevProps.match.params.id){
      console.log('singlePage.js componentDidUpdate dont update');
    } else {
      console.log('singlePage.js componentDidUpdate should update');
      this.getData();      
    }
  }

  render() {
    let pageJSX, articleJSX, data = null;
    if (this.state.loading) {
      pageJSX = <Loading/>
    } 
    else {    
      data = this.state.data;
      if (data.media_type === 'movie' || data.media_type === 'tv') {
        articleJSX = (
          <article>
            <h1>{data.title}</h1>
            <p>{data.overview}</p>
            <h2 className={styles.genre}>{data.genre.join(', ')}</h2>
            <div className={styles.sideItemText}>
              <div>
                <h3>Release Date</h3>
                <p>{data.releaseDate}</p>
              </div>
              <div>
                <h3>average rating</h3>
                <p>{data.avgVote} / 10</p>
              </div>
            </div>
            <div className={styles.sideItemText}>
              <div>
                <h3>Status</h3>
                <p>{data.status}</p>
              </div>
              <div>
                <h3>Runtime</h3>
                <p>{data.runtime} minutes</p>
              </div>
            </div>
          </article>
        )
      } else {
        articleJSX = (
          <article>
            <h1>{data.name}</h1>
            <p>{data.biography}</p>
            
            <div className={styles.sideItemText}>
              <div>
                <h3>Birthday</h3>
                <p>{data.birthday}</p>
              </div>
              <div>
                <h3>know for</h3>
                <p>{data.known_for_department}</p>
              </div>
            </div>
            <div className={styles.sideItemText}>
              <div>
                <h3>Gender</h3>
                <p>{parseInt(data.gender)===1 ? 'female': 'male'}</p>
              </div>
              <div>
                <h3>Birth Place</h3>
                <p>{data.place_of_birth}</p>
              </div>
            </div>
          </article>
        )
      }
      pageJSX = (
      <>
      <Search />
      <div 
      style={{ backgroundImage:`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${data.backdropPath})` }}
      className={styles.singleMovie}
      >
        <div className={styles.sideItem}>
          <div className={styles.posterImage}>
            <img src={data.posterPath} alt={`${data.title} poster`}/>
          </div>
          {articleJSX}
        </div>      
      </div>
      </>
    )}
    
    return (  
      <>
      {pageJSX}
      </>     
    )
  }
  
}

export default SinglePage;


