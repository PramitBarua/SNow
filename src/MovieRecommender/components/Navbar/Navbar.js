import React from 'react';
import { Link } from 'react-router-dom';

import { FaWindowClose, FaBars } from 'react-icons/fa';

import styles from './Navbar.module.scss';


const handleNavLinks = (navLinks, handleMenuHide, clsName=null) => {
  // console.log('in handleNavLinks');
  // console.log(linkObj);
  return (
    <ul className={clsName}>
      {navLinks.map((link, index) => {
        return (
          <li key={index}>
            <Link
            to={link.linkTo}
            onClick={handleMenuHide}>{link.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

// class Navbar extends Component{
const Navbar = (props) => {
  
  let logo, navBtn, navLinks, navDivClass, sidebarJSX; 

  logo =( 
    <Link 
      to='/'
      onClick={props.handleMenuHide}>
      <img className={styles.logo}
      src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" alt="the movie db logo"/>
    </Link>
  );
  
  navLinks = handleNavLinks(props.navLinks, props.handleMenuHide);
  sidebarJSX = null;
  navDivClass = null;

  navBtn = (
    <button 
      className={styles.btn}
      type='button'
      onClick={props.handleMenuShow}>
        <FaBars className={styles.btn_icon}></FaBars>
    </button>)

  if (props.menuShow) {    
    // sidebarJSX = <Sidebar>{navLinks}</Sidebar>
    sidebarJSX=handleNavLinks(props.navLinks, props.handleMenuHide, styles.nav_link_clicked)
    navDivClass = styles.nav_onClick;

    navBtn = (
      <button 
        className={styles.btn}
        type='button'
        onClick={props.handleMenuHide}>
          <FaWindowClose className={styles.btn_icon}></FaWindowClose>
      </button>)
  } 
  
  return (
    <div className={navDivClass}>
      <nav className={styles.nav}>
        {logo}
        <div className={styles.links_container}>
          {navLinks}
          {navBtn}        
        </div>
      </nav>
      {sidebarJSX}
    </div>
  )
  
}

export default Navbar
