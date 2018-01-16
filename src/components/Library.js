import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library container-fluid'>
        <div className="row justify-content-md-center">
        {
          this.state.albums.map((album, index) =>
            <Link to={`/album/${album.slug}`} key={index} className="col">
              <img src={album.albumCover} alt={album.title} className=" album-cover row" />
              <ul className="album-info row list-group">
                <li className="row"><h3>{album.title}</h3></li>
                <li className="row">{album.artist}</li>
                <li className="row">{album.songs.length} songs</li>
              </ul>
            </Link>
          )
        }
        </div>
      </section>
    );
  }
}

export default Library;
