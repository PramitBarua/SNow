import React from 'react';
import { Link } from 'react-router-dom';

import { FaWindowClose, FaBars } from 'react-icons/fa';

import styles from './Navbar.module.scss';

const handleNavLinks = (navLinks, handleMenuHide, clsName = null) => {
  return (
    <ul className={clsName}>
      {navLinks.map((link) => {
        return (
          <li key={link.id}>
            <Link to={link.linkTo}>{link.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = (props) => {
  const { navLinks, navMenuShow, handleMenuHide, handleMenuShow } = props;

  let logo, navBtn, navLinksJSX;
  // , navDivClass, sidebarJSX;

  logo = (
    <Link to={`/`} onClick={handleMenuHide}>
      <img
        className={styles.logo}
        src="https://www.themoviedb.org/assets/2/v4/logos/primary-blue-40c00543e47b657e8e53a2f3e8650eb9de230316cf158965edb012d72ddca755.svg"
        alt="the movie db logo"
      />
    </Link>
  );

  navLinksJSX = handleNavLinks(navLinks);

  // default show burger menu icon
  navBtn = (
    <button className={styles.btn} type="button" onClick={handleMenuShow}>
      <FaBars className={styles.btn_icon}></FaBars>
    </button>
  );

  if (navMenuShow) {
    // show close icon
    navBtn = (
      <button className={styles.btn} type="button" onClick={handleMenuHide}>
        <FaWindowClose className={styles.btn_icon}></FaWindowClose>
      </button>
    );
  }

  return (
    <nav className={styles.nav}>
      {logo}
      <div className={styles.links_container}>
        {navLinksJSX}
        {navBtn}
      </div>
    </nav>
  );
};

export default Navbar;
