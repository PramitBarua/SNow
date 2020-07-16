import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.scss';

const Info = (props) => {
  return (
    <div className={styles.info}>
      <p>Something went wrong!!!</p>
      <Link to={`${process.env.PUBLIC_URL}/`}>Go back to home</Link>
    </div>
  );
};

export default Info;
