import React from 'react';

import { FaGithub } from 'react-icons/fa';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Designed & developed by Pramit Barua</p>
      <a href="/">
        <FaGithub/>
        <span> View Code</span>
      </a>
    </div>
  )
}

export default Footer;