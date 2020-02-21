import React, { Component } from 'react';

class Explore extends Component {
  
  render() {
    return (
      <div>
        <form action="submit">
          <div>
            {/* type movie/tv or person */}
            <label htmlFor="">Type</label>
            <select name="search type">
              <option value="Movie">Movie</option>
              <option value="TV">Series</option>
              <option value="Person">Person</option>
            </select>
          </div>
          
          <div>
            {/* year */}
            <label htmlFor="">Year</label>
            <select name="search type">
              <option value="Movie">Movie</option>
              <option value="TV">Series</option>
              <option value="Person">Person</option>
            </select>
          </div>
          
          <div>
            {/* sorted by */}
            <label htmlFor="">Sort By</label>
            <select name="search type">
              <option value="Movie">Movie</option>
              <option value="TV">Series</option>
              <option value="Person">Person</option>
            </select>
          </div>
  
          <div>
            {/* Genres */}
            <label htmlFor="">Genres</label>
            <select name="search type">
              <option value="Movie">Movie</option>
              <option value="TV">Series</option>
              <option value="Person">Person</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

export default Explore
