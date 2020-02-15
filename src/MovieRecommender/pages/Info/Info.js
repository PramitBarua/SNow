import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.scss';

const Info = () => {
  return (
    <div className={styles.info}>
      <p>Something went wrong!!!</p>
      <p className={styles.longText}>Please make sure that your internet connection is working</p>
      <Link
      to={`/`}>Go back to home</Link>
    </div>
  )
  
}

export default Info;
