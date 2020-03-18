import React from "react";
import { Link } from "react-router-dom";

import { FaWindowClose, FaBars } from "react-icons/fa";

import styles from "./Navbar.module.scss";

const handleNavLinks = (navLinks, handleMenuHide, clsName = null) => {
  // console.log('in handleNavLinks');
  // console.log(linkObj);
  return (
    <ul className={clsName}>
      {navLinks.map(link => {
        // console.log(`${link.name}: ${link.linkTo}`);
        return (
          <li key={link.id}>
            <Link to={link.linkTo}>{link.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = props => {
  // console.log('props in navbar');
  // console.log(props);

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

  navLinksJSX = handleNavLinks(navLinks, handleMenuHide);
  // sidebarJSX = null;
  // navDivClass = null;

  navBtn = (
    <button className={styles.btn} type="button" onClick={handleMenuShow}>
      <FaBars className={styles.btn_icon}></FaBars>
    </button>
  );

  if (navMenuShow) {
    // sidebarJSX=handleNavLinks(navLinks, handleMenuHide, styles.nav_link_clicked)
    // navDivClass = styles.nav_onClick;

    navBtn = (
      <button className={styles.btn} type="button" onClick={handleMenuHide}>
        <FaWindowClose className={styles.btn_icon}></FaWindowClose>
      </button>
    );
  }

  // console.log('navbar.js render');

  return (
    // <div className={navDivClass}>
    <nav className={styles.nav}>
      {logo}
      <div className={styles.links_container}>
        {navLinksJSX}
        {navBtn}
      </div>
    </nav>
    // {sidebarJSX}
    // </div>
  );
};

export default Navbar;

// logo in green
// src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"

//logo in black
// src='https://www.themoviedb.org/assets/2/v4/logos/primary-blue-40c00543e47b657e8e53a2f3e8650eb9de230316cf158965edb012d72ddca755.svg'
