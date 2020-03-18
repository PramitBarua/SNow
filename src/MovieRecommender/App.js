import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

import styles from "./App.module.scss";

import Home from "./pages/Home/Home";
import AdvanceSearch from "./pages/Explore/Explore";
import SingleMovie from "./pages/SinglePage/SinglePage";
import Info from "./pages/Info/Info";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NavMenu from "./components/NavMenu/NavMenu";
import { functionGeneral } from "./General";

import defaultPoster from "./assets/images/no_poster_found.png";

// import Test from './components/Test';

class App extends Component {
  KEY = process.env.REACT_APP_MOVIE_API_KEY;
  generalFunc = functionGeneral();
  imageURL = this.generalFunc.getImageURL();
  // genreObj = this.generalFunc.getGenre();
  baseURL = this.generalFunc.getBaseURL();

  state = {
    navLinks: [
      { id: 1, name: "Home", linkTo: "/" },
      { id: 2, name: "Explore", linkTo: "/advSearch" },
      { id: 3, name: "About", linkTo: "/about" }
    ],
    movies: [],
    TVs: [],
    persons: [],
    navMenuShow: false,
    loading: true,
    loadingFailed: false,
    errorMessage: ""
  };

  componentDidMount() {
    // console.log('app.js componentDidMount');

    const promiseMovieString = `${this.baseURL.discover}/movie?api_key=${this.KEY}`;
    // console.log('app.js promiseMovieString');
    // console.log(promiseMovieString);

    const promiseMovie = Axios.get(promiseMovieString);

    const promiseTVString = `${this.baseURL.discover}/tv?api_key=${this.KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`;
    // console.log('app.js promiseTV');
    // console.log(promiseTVString);

    const promiseTV = Axios.get(promiseTVString);

    const promisePersonString = `${this.baseURL.popularPerson}api_key=${this.KEY}&language=en-US&page=1`;
    // console.log('app.js promisePerson');
    // console.log(promisePersonString);

    const promisePerson = Axios.get(promisePersonString);

    Promise.all([promiseMovie, promiseTV, promisePerson])
      .then(response => {
        // console.log("app.js componentDidMount response");
        // console.log(response);
        const movies = response[0].data.results.map(movie => {
          movie.posterPath = movie.poster_path
            ? `${this.imageURL.urlBase}${this.imageURL.sizePoster}${movie.poster_path}`
            : defaultPoster;

          movie.media_type = "movie";

          return { ...movie };
        });
        const TVs = response[1].data.results.map(TV => {
          TV.posterPath = TV.poster_path
            ? `${this.imageURL.urlBase}${this.imageURL.sizePoster}${TV.poster_path}`
            : defaultPoster;

          TV.media_type = "tv";

          return { ...TV };
        });
        const persons = response[2].data.results.map(person => {
          // console.log(`App.js person.profile_path ${person.profile_path}`);
          person.posterPath = person.profile_path
            ? `${this.imageURL.urlBase}${this.imageURL.sizePoster}${person.profile_path}`
            : defaultPoster;

          person.media_type = "person";

          return { ...person };
        });
        // console.log(movies, series);
        this.setState({
          movies,
          TVs,
          persons,
          loading: false
        });
      })
      .catch(err => {
        // console.log('app.js error');
        // console.log(err);
        this.setState({
          loading: false,
          loadingFailed: true,
          errorMessage: err
        });
      });
  }

  handleMenuShow = () => {
    this.setState({
      navMenuShow: true
    });
  };

  handleMenuHide = () => {
    this.setState({
      navMenuShow: false
    });
  };

  render() {
    let routePages,
      infoPage,
      navMenuBtn = null;
    if (this.state.loadingFailed) {
      // console.log('app.js errorMessage')
      // console.log(this.state.errorMessage)
      infoPage = (
        <Route>
          <Info>{this.state.errorMessage}</Info>
        </Route>
      );
    } else if (!this.state.navMenuShow) {
      routePages = (
        <Switch>
          <Route exact path={`/`}>
            <Home
              displayItems={[
                { heading: "most popular Movies", data: this.state.movies },
                { heading: "most popular shows", data: this.state.TVs },
                { heading: "most popular persons", data: this.state.persons }
              ]}
              loading={this.state.loading}
            />
          </Route>
          <Route exact path={`/advSearch`} component={AdvanceSearch} />
          <Route exact path={`/:media_type/:id`} component={SingleMovie} />
          <Route exact path={`/about`} component={About} />
          <Route component={Info} />
        </Switch>
      );
    } else {
      // for mobile nav button
      navMenuBtn = (
        <NavMenu
          handleMenuHide={this.handleMenuHide}
          navLinks={this.state.navLinks}
        />
      );
    }

    // console.log('app.js render');
    return (
      <Router basename={"/"}>
        <div className={styles.app}>
          <Navbar
            navLinks={this.state.navLinks}
            navMenuShow={this.state.navMenuShow}
            handleMenuHide={this.handleMenuHide}
            handleMenuShow={this.handleMenuShow}
          />
          {routePages}
          {infoPage}
          {navMenuBtn}
          <Footer />
        </div>
        {/* <Test/> */}
      </Router>
    );
  }
}

export default App;
