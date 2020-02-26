import React from 'react';
import CardSlider from '../../components/CardSlider/CardSlider';
import Search from '../../components/Search/Search';
// import styles from './Home.module.scss';
import Loading from '../../components/Loading/Loading';


const Home = (props) => {

  let CardsJSX;

  if (!props.loading) {    
    CardsJSX = (
      <div>
        <Search/>
        {props.displayItems
        .map((item, index) => {          
          return (
            <CardSlider
              key={index}
              displayItems={item}
              // cardRenderSteps={props.cardRenderSteps}
            />          
          )}
        )}
      </div>
    )
  } 
  else {
    CardsJSX = <Loading/>
  }

  // console.log('Home.js render');
  
  return (
    <>
      {CardsJSX}
      
    </>
  )
  
}


export default Home;