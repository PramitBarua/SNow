import React, { useContext } from 'react';
import { DataContext } from '../../context';

import styles from './SingleMovie.module.scss';

const SingleMovie = (props) => {
  const { getClickedShow } = useContext(DataContext);
  
  const showId = props.match.params.id;  
  const showDetails = getClickedShow(parseInt(showId));

  let movieJSX = null;

  if (showDetails) {
    console.log(showDetails);
    let {
      popularity,
      title,
      name,
      overview,
      posterPath,
      backdropPath,
      vote_average:avgVote,
      release_date:releaseDate,
      first_air_date,
      genre
    } = showDetails;

    title = title ? title : name;
    releaseDate = releaseDate ? releaseDate : first_air_date;
    console.log(releaseDate);
   
    movieJSX = (
    <div 
    style={{ backgroundImage:`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backdropPath})` }}
    className={styles.singleMovie}
    >
      <div className={styles.sideItem}>
        <div className={styles.posterImage}>
          <img src={posterPath} alt={`${title} poster`}/>
        </div>
        <article>
          <h1>{title}</h1>
          <p>{overview}</p>
          <h2 className={styles.genre}>{genre.join(', ')}</h2>
          <div className={styles.sideItemText}>
            <div>
              <h3>Release Date</h3>
              <p>{releaseDate}</p>
            </div>
            <div>
              <h3>average rating</h3>
              <p>{avgVote} / 10</p>
            </div>
          </div>
        </article>
      </div>      
    </div>
    )
  }
  

  return (
    <>
      {movieJSX}
    </>
  )
}

export default SingleMovie


