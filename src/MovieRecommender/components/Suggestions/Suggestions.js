import React from "react";
import { Link } from "react-router-dom";
// import { DataContext } from '../../Context/context';

import styles from "./Suggestions.module.scss";

const Suggestions = props => {
  const options = props.resutls.map(r => (
    <li key={r.id}>
      <Link to={`/${r.type}/${r.id}`} onClick={props.removeResults}>
        {r.title}
      </Link>
    </li>
  ));

  // console.log('suggestions.js render');
  // console.log('suggestion.js props.onFocus');
  // console.log(props.onFocus)
  let stylesName = props.onFocus
    ? `${styles.suggestions} ${styles.active}`
    : styles.suggestions;
  return <ul className={stylesName}>{options}</ul>;
};

export default Suggestions;
