import React, { useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import Card from '../Card/Card';
import styles from './CardSlider.module.scss';

function CardSlider(props) {
  const getScrollRefPositions = () => {
    const container = scrollRef.current;

    const scrollPositionLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const scrollOffsetWidth = scrollRef.current.offsetWidth;

    return { container, scrollPositionLeft, scrollWidth, scrollOffsetWidth };
  };

  const handleBtnRight = () => {
    const {
      container,
      scrollPositionLeft,
      scrollWidth,
      scrollOffsetWidth,
    } = getScrollRefPositions();

    container.scrollTo({
      top: 0,
      left:
        scrollPositionLeft + Math.round((scrollWidth - scrollOffsetWidth) / 20),
      behaviour: 'smooth',
    });
  };

  const handleBtnLeft = () => {
    const {
      container,
      scrollPositionLeft,
      scrollWidth,
      scrollOffsetWidth,
    } = getScrollRefPositions();

    container.scrollTo({
      top: 0,
      left:
        scrollPositionLeft - Math.round((scrollWidth - scrollOffsetWidth) / 20),
      behaviour: 'smooth',
    });
  };

  const scrollRef = useRef(null);

  let renderData,
    heading,
    cards = null;

  renderData = props.displayItems.data;
  heading = props.displayItems.heading;

  if (renderData.length === 0) {
    cards = (
      <p className={styles.errorMessage}>
        Nothing has Found!!! Please try again
      </p>
    );
  } else {
    cards = renderData.map((item) => {
      const name = item.title ? item.title : item.name;
      return (
        <Card
          key={item.id}
          toLink={`/${item.media_type}/${item.id}`}
          image_path={item.posterPath}
          alt={`poster of ${name}`}
        />
      );
    });
  }

  return (
    <div className={styles.cardSection}>
      <p className={styles.homeText}>{heading}</p>
      <div className={styles.sliderContainer}>
        <button
          className={`${styles.btn} ${styles.btnLeft}`}
          onClick={handleBtnLeft}
        >
          <RiArrowLeftSLine />
        </button>

        <div ref={scrollRef} className={styles.cardWrapper}>
          {cards}
        </div>

        <button
          className={`${styles.btn} ${styles.btnRight}`}
          onClick={handleBtnRight}
        >
          <RiArrowRightSLine />
        </button>
      </div>
    </div>
  );
}

export default CardSlider;
