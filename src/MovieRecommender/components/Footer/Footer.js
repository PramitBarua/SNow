import React from 'react';

import { FaGithub } from 'react-icons/fa';

import styles from './Footer.module.scss';

const Footer = () => {
  // console.log('footer.js render');
  return (
    <div className={styles.footer}>
      <p>Designed & developed by Pramit Barua</p>
      <p>Web developer</p>
      <a href="https://github.com/PramitBarua/showRecommender">
        <FaGithub/>
        <span> View Code</span>
      </a>
    </div>
  )
}

export default Footer;