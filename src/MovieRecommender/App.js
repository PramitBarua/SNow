import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import styles from './App.module.scss';

import Home from './pages/Home/Home';
import SingleMovie from './pages/SingleMovie';
import Info from './pages/Info';
import About from './pages/About';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
// import {BaseDataProvider} from './context';

import Test from './components/Test';

class App extends Component {

  state = {
    navLinks: [
      {name: 'Home', linkTo: '/'},
      {name: 'Advance search', linkTo: '/'},
      {name: 'About', linkTo: '/about'}
    ],
    navMenuShow: false
  }

  handleMenuShow = () => {
    this.setState({
      navMenuShow: true
    })
  }

  handleMenuHide = () => {
    this.setState({
      navMenuShow: false
      
    })
  }

  render() {
    let pages = null;
    if (!this.state.navMenuShow) {
      pages= (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/movie/:slug' component={SingleMovie} />
        <Route exact path='/about' component={About} />
        <Route component={Info} />
      </Switch>)
    }
    return (      
      // <BaseDataProvider>
        <Router>
          <div className={styles.app}>
            <Navbar 
              navLinks={this.state.navLinks}
              handleMenuHide={this.handleMenuHide}
              handleMenuShow={this.handleMenuShow}
              menuShow={this.state.navMenuShow}
            />

            {pages}
            <Footer/>
          </div>
          {/* <Test/> */}
        </Router>
      // </BaseDataProvider>
    )
  }
}

export default App;