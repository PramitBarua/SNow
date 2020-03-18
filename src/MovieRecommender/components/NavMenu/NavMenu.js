import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavMenu.module.scss";

const Suggestions = props => {
  const options = props.navLinks.map(r => {
    // console.log(r.linkTo);
    return (
      <li key={r.id}>
        <Link to={r.linkTo} onClick={props.handleMenuHide}>
          {r.name}
        </Link>
      </li>
    );
  });

  // console.log("navMenu.js render");
  return <ul className={styles.navMenu}>{options}</ul>;
};

export default Suggestions;
