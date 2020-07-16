import React from 'react';
import styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles.aboutDivWrapper}>
      <p>
        This website is about finding information about popular movies,
        tv-series, and persons. You can also search for what movie/tv-show you
        want to see next based on your criteria. Please click{' '}
        <a href="/advSearch">Explore</a> for the detailed search.
      </p>
      <p>
        In this project, I have used JavaScript library <span>React</span> for
        front-end programming, <span>SASS</span> for styling, and the public
        rest API{' '}
        <a href="https://developers.themoviedb.org/3/getting-started/introduction">
          the movie DB
        </a>
        . The source code is now available in{' '}
        <a href="https://github.com/PramitBarua/showRecommender">
          <span>Github</span>
        </a>
        .
      </p>
    </div>
  );
};

export default About;
