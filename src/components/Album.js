import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component{
  constructor(props) {
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

  play() {
    this.audioElement.play();
    this.setState({isPlaying:true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying:false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  handleSongClick(song){
    const isSameSong = this.state.currentSong === song;

    if(this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

  handlePrevClick(song){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick(song){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = (currentIndex + 1);
    if(newIndex === this.state.album.songs.length) {return;};
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e){
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e){
    const volume = e.target.value;
    this.audioElement.volume = volume;
    this.setState({ volume:volume });
  }

  formatTime(time) {
    console.log(time);
    var min = Math.floor(time/60);
    var sec = Math.round(time - (min*60));
    if(isNaN(time)){return '--:--';}
    if(min < 10) {min = '0' + min;}
    if(sec < 10) {sec = '0' + sec;}
    return min + ':' + sec;
  }

  songClass(song) {
    console.log(this.state.currentSong === song, this.state.isPlaying);
    if(this.state.currentSong === song){
      if(this.state.isPlaying){ return "song playing"}
      else{
        return 'song';
      }
    }

    return "song";
  }

  render() {
    return (
      <section className="album container-fluid">
        <section id="album-info" className="row">
            <img id="album-cover-art" className="col-md-6" src={this.state.album.albumCover} alt={this.state.album.title} />
            <div className="album-details align-content-center">
              <div><h1 id="album-title">{this.state.album.title}</h1></div>
              <div className="artist"><b>{this.state.album.artist}</b></div>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
        </section>
        <table id="song-list" className="container-fluid">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody >
            {
              this.state.album.songs.map((song,index) =>
                 <tr className={this.songClass(song)} key={index} onClick={() => this.handleSongClick(song)}>
                  <td className="song-actions">
                    <button>
                      <span className="song-number col-sm-2">{index+1}</span>
                      <span className="ion-play"></span>
                      <span className="ion-pause"></span>
                    </button>
                   </td>
                  <td className="song-title col-lg-8">{song.title}</td>
                  <td id="song-duration" className="col-sm-2">{this.formatTime(song.duration)}</td>
                 </tr>
               )
              }
          </tbody>
        </table>
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            volume={this.audioElement.volume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            formatTime={(time) => this.formatTime(time)}
          />
      </section>
    );
  }
}

export default Album;
