import React, { Component } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';

import Card from '../Card/Card';
import styles from './CardSlider.module.scss';

class CardSlider extends Component {
  constructor(props) {
    super(props);

    let windowMobile, end, cardRenderSteps;

    if (window.innerWidth < 600) {
      windowMobile = true;
      end = 1;
      cardRenderSteps = 1;
    } else {
      windowMobile = false;
      end = 5;
      cardRenderSteps = 5;
    }
    this.state = {
      start: 0,
      end,
      cardRenderSteps,
      windowMobile,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (e) => {
    if (window.innerWidth < 600) {
      if (!this.state.windowMobile) {
        this.setState({
          start: 0,
          end: 1,
          cardRenderSteps: 1,
          windowMobile: true,
        });
      }
    } else {
      if (this.state.windowMobile) {
        this.setState({
          start: 0,
          end: 5,
          cardRenderSteps: 5,
          windowMobile: false,
        });
      }
    }
  };

  handleRightButtonClick = () => {
    let oldState = { ...this.state };

    if (oldState.end === this.props.displayItems.data.length) {
      oldState.start = 0;
      oldState.end = this.state.cardRenderSteps;
    } else {
      oldState.start = oldState.start + this.state.cardRenderSteps;
      oldState.end = oldState.end + this.state.cardRenderSteps;
    }

    this.setState({
      ...oldState,
    });
  };

  handleLeftButtonClick = () => {
    let oldState = { ...this.state };

    if (oldState.start === 0) {
      oldState.start =
        this.props.displayItems.data.length - this.state.cardRenderSteps;
      oldState.end = this.props.displayItems.data.length;
    } else {
      oldState.start = oldState.start - this.state.cardRenderSteps;
      oldState.end = oldState.end - this.state.cardRenderSteps;
    }

    this.setState({
      ...oldState,
    });
  };

  render() {
    let dataLength,
      sliderBtnJSX,
      renderData,
      cards = null;

    dataLength = this.props.displayItems.data.length;

    if (dataLength >= this.state.cardRenderSteps * 2) {
      sliderBtnJSX = (
        <div className={styles.btnWrapper}>
          <button onClick={this.handleLeftButtonClick}>
            <FaRegArrowAltCircleLeft />
          </button>
          <button onClick={this.handleRightButtonClick}>
            <FaRegArrowAltCircleRight />
          </button>
        </div>
      );
    }

    if (dataLength <= this.state.cardRenderSteps) {
      renderData = this.props.displayItems.data;
    } else {
      renderData = this.props.displayItems.data.slice(
        0,
        parseInt(dataLength / this.state.cardRenderSteps) *
          this.state.cardRenderSteps
      );
    }

    if (dataLength === 0) {
      cards = (
        <p className={styles.errorMessage}>
          Nothing has Found!!! Please try again
        </p>
      );
    } else {
      cards = renderData.slice(this.state.start, this.state.end).map((item) => {
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
        <p className={styles.homeText}>{this.props.displayItems.heading}</p>
        <div className={styles.cardWrapper}>{cards}</div>
        {sliderBtnJSX}
      </div>
    );
  }
}

export default CardSlider;
