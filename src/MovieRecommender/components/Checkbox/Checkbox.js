import React, { Component } from 'react';
import styles from './Checkbox.module.scss';

class Checkbox extends Component {
  // props-items is an array of object and each object contains 3 keys (id, name and status)

  constructor(props) {
    super(props);
    this.state = {
      renderItem:{},
      searchingFor: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.searchingFor !== nextProps.searchingFor){
      // console.log('Checkbox.js getDerivedStateFromProps updating state');
      let renderItem = {}
      nextProps.items.forEach(item => {
        renderItem[item.id]=item.status
    })
      return {
        renderItem,
        searchingFor:nextProps.searchingFor
      }
    }
    return null;
  }

  handleItemOnClick = (e) => {
    // console.log('checkbox.js handleItemOnClick')
    
    let name, status;

    if (e.target.tagName === 'LABEL') {
      
      name = e.target.htmlFor;
      status = !this.state.renderItem[e.target.htmlFor];
    } else {
      name = e.target.name;
      status = e.target.checked;
    }

    // if (status) {
    //   e.target.parentElement.classList.add(styles.wrapperDivActive);
    // } else {
    //   e.target.parentElement.classList.remove(styles.wrapperDivActive);
    // }

    this.props.rootAction(name);

    this.setState({
      renderItem: {
        ...this.state.renderItem,
        [name]:status
      }
    })
  }

  render() {
    // console.log('checkbox.js render');
    // console.log(this.state.renderItem);
    let check, divStylesClass;
    return (
      <>
        {this.props.items.map((item, index) => {
          check = this.state.renderItem[item.id];
          divStylesClass = check ? `${styles.wrapperDiv} ${styles.wrapperDivActive}` : styles.wrapperDiv;
          return (
          <div className={divStylesClass}
          key={index}>
            <input
              type='checkbox'
              name={item.id}
              checked={check}
              onChange={(e) => this.handleItemOnClick(e)}/>
            <label 
            htmlFor={item.id}
            onClick={(e) => this.handleItemOnClick(e)}>
              {`${item.name}`}
            </label>
          </div>)
        })}
      </>
    )
  }
}

export default Checkbox
