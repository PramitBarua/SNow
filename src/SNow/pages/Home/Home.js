import React from 'react';
import CardSlider from '../../components/CardSlider/CardSlider';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';

const Home = (props) => {
  let CardsJSX;

  if (!props.loading) {
    CardsJSX = (
      <>
        <Search />
        {props.displayItems.map((item, index) => {
          return <CardSlider key={index} displayItems={item} />;
        })}
      </>
    );
  } else {
    CardsJSX = <Loading />;
  }

  return <>{CardsJSX}</>;
};

export default Home;
