import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Info.module.scss';

const Info = (props) => {
  console.log('info.js render');
  console.log(props)
  return (
    <div className={styles.info}>
      <p>Something went wrong!!!</p>
      <p className={styles.longText}>{props.children.message}</p>
      <Link
      to={`/`}>Go back to home</Link>
    </div>
  )
  
}

export default Info;
