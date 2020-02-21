import React from 'react';
import { Link } from 'react-router-dom';
// import { DataContext } from '../../Context/context';

import styles from './Suggestions.module.scss';



const Suggestions = (props) => {

  const options = props.resutls.map(r => (
    <li key={r.id}>
      <Link 
      to={`/${r.type}/${r.id}`}
      onClick={props.removeSeachResults}
      >{r.title}
      </Link>
    </li>
  ))

  console.log('suggestions.js render')
  return <ul className={styles.suggestions}>{options}</ul>
}

export default Suggestions
