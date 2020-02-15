import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import styles from './App.module.scss';

import Home from './pages/Home/Home';
import AdvanceSearch from './pages/AdvancedSearch/AdvanceSearch';
import SingleMovie from './pages/SingleMovie/SingleMovie';
import Info from './pages/Info/Info';
import About from './pages/About';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import {DataContext} from './context';


import Test from './components/Test';

const App = () => {
  
  const {navMenuShow, loadingFailed, navLinks, handleMenuHide, handleMenuShow} = useContext(DataContext);

  let pages = null;
  if (!navMenuShow) {
    pages= (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/advSearch' component={AdvanceSearch} />
      <Route exact path='/:media_type/:id' component={SingleMovie} />
      <Route exact path='/about' component={About} />
      <Route component={Info} />
    </Switch>)
  }
  return (      
      <Router>
        <div className={styles.app}>
          <Navbar
          navLinks={navLinks}
          navMenuShow={navMenuShow}
          handleMenuHide={handleMenuHide}
          handleMenuShow={handleMenuShow}/>
          {loadingFailed ? <Info/> : pages}
          <Footer/>
        </div>
        <Test/>
      </Router>
  )
}


export default App;