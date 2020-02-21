import React from 'react';
import CardSlider from '../../components/CardSlider/CardSlider';
import Search from '../../components/Search/Search';
// import styles from './Home.module.scss';
import Loading from '../../components/Loading/Loading';


const Home = (props) => {

  let CardsJSX;
  
  if (!props.loading) {
    console.log('home.js props.cardRenderSteps');
    console.log(props.cardRenderSteps);
    CardsJSX = (
      <>
        <Search/>
        {props.displayItems
        .map((item, index) => {
          console.log('home.js item');
          console.log(item);
          return (
            <CardSlider
              key={index}
              displayItems={item}
              cardRenderSteps={props.cardRenderSteps}
            />          
          )}
        )}
      </>
    )
  } else {
    CardsJSX = <Loading/>
  }

  console.log('Home.js render')
  
  return (
    <>
      {CardsJSX}
      
    </>
  )
  
}


export default Home;