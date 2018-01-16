import React from 'react';

const Landing = () => (
  <section className="library container-fluid justify-content-md-center">
    <h1 className="hero-title">Turn the music up!</h1>
    <section className="selling-points row justify-content-md-center">
        <div className="point col-md-4">
          <img src="assets/images/music-icon.png" />
          <h3 className="point-title">Choose your music</h3>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="point col-md-4">
          <img src="assets/images/sound-waves.png" />
          <h3 className="point-title">Unlimited streaming.</h3>
          <p className="point-description">Ad-free.<br />No arbitrary limits.<br />No distractions.</p>
        </div>
        <div className="point col-md-4">
          <img src="assets/images/mobile.png" />
          <h3 className="point-title">Mobile enabled</h3>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </section>
  </section>
);

export default Landing;
