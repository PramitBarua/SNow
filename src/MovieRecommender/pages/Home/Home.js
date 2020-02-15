import React, { useContext } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './Home.module.scss';
import { DataContext } from '../../context';


const Home = () => {

  const {movies, series, loading} = useContext(DataContext);

  let movieCards, seriesCards, CardsJSX;

  movieCards = [];
  seriesCards = [];
  
  if (!loading) {
    [movieCards, seriesCards] = [movies, series].map(showitems => {
      return (
        showitems.map(item=>{
          return (
            <MovieCard 
            key={item.id}
            toLink={`/movie/${item.id}`}
            image_path={item.posterPath}
            alt={`poster of ${item.title}`}/>  
          )
        })
      )
    })

    CardsJSX = (
      <>
        {/* <div> */}
          <p className={styles.homeText}>Most popular movies</p>
          <div className={styles.cardSliderWrapper}>
            {movieCards}
          </div>
        {/* </div> */}
    
        {/* <div> */}
          <p className={styles.homeText}>Most popular series</p>
          <div className={styles.cardSliderWrapper}>
            {seriesCards}
          </div>
        {/* </div> */}
      </>
    );     
  }
  
  return (
    <div className={styles.home}>
      {CardsJSX}
    </div>
  )
  
}


export default Home;