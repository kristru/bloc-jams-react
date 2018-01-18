import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar container">
        <section id="buttons" className="container-fluid row justify-content-center">
           <button id="previous" onClick={this.props.handlePrevClick}>
             <span className="ion-skip-backward"></span>
           </button>
           <button id="play-pause" onClick={this.props.handleSongClick}>
             <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
           </button>
           <button id="next" onClick={this.props.handleNextClick}>
             <span className="ion-skip-forward"></span>
           </button>
         </section>

         <section className="controls container row">
           <section id="time-control" className="col-md-8 row justify-content-start">
            <div className="current-time col">{this.props.formatTime(this.props.currentTime)}</div>
            <input
              type="range"
              className="seek-bar col-md-8 col-sm-8"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
            <div className="total-time col">{this.props.formatTime(this.props.duration)}</div>
           </section>

           <section id="volume-control" className="col-md-4 row justify-content-end">
             <div className="icon ion-volume-low col-sm-1"></div>
             <input
                type="range"
                className="seek-bar col-sm-4"
                value={this.props.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
              />
             <div className="icon ion-volume-high col-sm-1"></div>
           </section>
          </section>
      </section>
    );
  }
}

export default PlayerBar;
