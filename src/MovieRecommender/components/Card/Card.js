import React from "react";

import styles from "./Card.module.scss";

import { Link } from "react-router-dom";

const MovieCard = props => {
  // console.log("card.js render");

  return (
    <Link className={styles.movieCard} to={props.toLink}>
      <img src={props.image_path} alt={props.alt} />
    </Link>
  );
};

export default MovieCard;
