import React from 'react';
import loadingGif from '../../assets/images/loading.gif';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loadingDiv}>
      <img src={loadingGif} alt=""/>
      <h2>Data is loading. Please wait...</h2>
    </div>
  )
}

export default Loading;
