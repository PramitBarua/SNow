import React, { Component } from 'react';
import Axios from 'axios';

import defaultPoster from '../../assets/images/no_poster_found.png';

import styles from './SinglePage.module.scss';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import { functionGeneral } from '../../General';

class SinglePage extends Component {
  state = {
    loading: true,
    error: false,
    data: {},
    showFullDescription: false,
  };

  toggleDescriptionShow = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showFullDescription: !prevState.showFullDescription,
      };
    });
  };
  getData = () => {
    const baseURL = functionGeneral().getBaseURL();
    const imageURL = functionGeneral().getImageURL();
    const KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const id = this.props.match.params.id;
    const media_type = this.props.match.params.media_type;

    let data = {};

    const url = `${baseURL.byId}/${media_type}/${id}?api_key=${KEY}&language=en-US`;

    Axios.get(url)
      .then((response) => {
        data = { ...response.data };

        data.backdropPath = data.backdrop_path
          ? `${imageURL.urlBase}${imageURL.sizeBackDrop}${data.backdrop_path}`
          : null;

        data.media_type = media_type;

        if (media_type === 'movie' || media_type === 'tv') {
          data.title = data.title ? data.title : data.name;
          data.posterPath = data.poster_path
            ? `${imageURL.urlBase}${imageURL.sizePosterBig}${data.poster_path}`
            : defaultPoster;
          data.releaseDate = data.release_date
            ? data.release_date
            : data.first_air_date;
          data.avgVote = data.vote_average ? data.vote_average : null;

          if (data.runtime) {
            if (typeof data.runtime === 'object') {
              data.runtime = data.runtime.join(', ');
            }
          } else {
            if (typeof data.episode_run_time === 'object') {
              data.runtime = data.episode_run_time.join(', ');
            }
          }
          // data.runtime = data.runtime ? data.runtime.join(', ') : data.episode_run_time.join(', ')
          data.genre = data.genres.map((genre) => genre.name);
          data.description = data.overview;
        } else {
          data.posterPath = data.profile_path
            ? `${imageURL.urlBase}${imageURL.sizePosterBig}${data.profile_path}`
            : defaultPoster;
          data.homepage = data.homepage ? data.homepage : '-';
          data.description = data.biography;
        }

        this.setState({
          data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.media_type ===
        prevProps.match.params.media_type &&
      this.props.match.params.id === prevProps.match.params.id
    ) {
    } else {
      this.getData();
    }
  }

  render() {
    let pageJSX = null;
    let articleJSX = null;
    let data = null;
    let description = null;

    if (this.state.loading) {
      pageJSX = <Loading />;
    } else if (this.state.error) {
      pageJSX = (
        <p className={styles.errorText}>
          Server error, please try again later. <br /> Sorry for the
          inconvenience.
        </p>
      );
    } else {
      data = this.state.data;

      if (data.description.length > 150) {
        if (this.state.showFullDescription) {
          description = (
            <p>
              {data.description}
              <button onClick={this.toggleDescriptionShow}>Show Less</button>
            </p>
          );
        } else {
          description = (
            <p>
              {`${data.description.slice(0, 150)}... `}
              <button onClick={this.toggleDescriptionShow}>Show More</button>
            </p>
          );
        }
      } else {
        description = <p>{data.description}</p>;
      }

      if (data.media_type === 'movie' || data.media_type === 'tv') {
        articleJSX = (
          <article>
            <h1>{data.title}</h1>

            <div className={styles.description}>{description}</div>

            <h2 className={styles.genre}>{data.genre.join(', ')}</h2>

            <div className={styles.sideItemText}>
              <div>
                <h3>Release Date</h3>
                <p>{data.releaseDate}</p>
              </div>
              <div>
                <h3>average rating</h3>
                <p>{data.avgVote} / 10</p>
              </div>
            </div>

            <div className={styles.sideItemText}>
              <div>
                <h3>Status</h3>
                <p>{data.status}</p>
              </div>
              <div>
                <h3>Runtime</h3>
                <p>{data.runtime} minutes</p>
              </div>
            </div>
          </article>
        );
      } else {
        articleJSX = (
          <article>
            <h1>{data.name}</h1>

            <div className={styles.description}>{description}</div>

            <div className={styles.sideItemText}>
              <div>
                <h3>Birthday</h3>
                <p>{data.birthday}</p>
              </div>
              <div>
                <h3>know for</h3>
                <p>{data.known_for_department}</p>
              </div>
            </div>

            <div className={styles.sideItemText}>
              <div>
                <h3>Gender</h3>
                <p>{parseInt(data.gender) === 1 ? 'female' : 'male'}</p>
              </div>
              <div>
                <h3>Birth Place</h3>
                <p>{data.place_of_birth}</p>
              </div>
            </div>
          </article>
        );
      }
      pageJSX = (
        <>
          <Search />
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${data.backdropPath})`,
            }}
            className={styles.singleMovie}
          >
            <div className={styles.sideItem}>
              <div className={styles.posterImage}>
                <img src={data.posterPath} alt={`${data.title} poster`} />
              </div>
              {articleJSX}
            </div>
          </div>
        </>
      );
    }

    return <>{pageJSX}</>;
  }
}

export default SinglePage;
