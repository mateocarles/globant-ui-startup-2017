
import React, { Component } from 'react';
import FavoriteSongBox from  './FavoriteSongBox';

class FavoriteSongsContainer extends Component {

  render() {
    return (
      <div>
        <h2> Songs </h2>
        <h3>{this.props.artist}</h3>
      </div>
    );
  }
}

export default FavoriteSongsContainer;