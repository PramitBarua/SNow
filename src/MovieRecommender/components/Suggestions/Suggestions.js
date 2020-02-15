import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context';

import styles from './Suggestions.module.scss';

const Suggestions = (props) => {
  console.log('suggestions.js props');
  console.log(props.resutls);
  
  const { setClickedShow } = useContext(DataContext)
  const options = props.resutls.map(r => (
    <li key={r.id}>
      <Link 
      to={`/${r.type}/${r.id}`}
      onClick={() => setClickedShow(r.type, r.id)}
      >{r.title}
      </Link>
    </li>
  ))
  return <ul className={styles.suggestions}>{options}</ul>
}

export default Suggestions
