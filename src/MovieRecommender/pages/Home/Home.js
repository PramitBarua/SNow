import React, { useContext } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import Search from '../../components/Search/Search';
import styles from './Home.module.scss';
import { DataContext } from '../../context';


const Home = () => {

  const {movies, series, loading} = useContext(DataContext);

  let movieCards, seriesCards, CardsJSX;

  movieCards = [];
  seriesCards = [];
  
  if (!loading) {
    [movieCards, seriesCards] = [movies, series].map(showitems => {
      console.log('home.js showitems');
      console.log(showitems);
      return (
        showitems.map(item=>{
          return (
            <MovieCard 
            key={item.id}
            toLink={`/${item.media_type}/${item.id}`}
            image_path={item.posterPath}
            alt={`poster of ${item.title}`}/>  
          )
        })
      )
    })

    CardsJSX = (
      <>
        <Search/>
        <p className={styles.homeText}>Most popular movies</p>
        <div className={styles.cardSliderWrapper}>
          {movieCards}
        </div>
    
        <p className={styles.homeText}>Most popular series</p>
        <div className={styles.cardSliderWrapper}>
          {seriesCards}
        </div>
      </>
    )
  }
  
  return (
    <>
      {CardsJSX}
    </>
  )
  
}


export default Home;