import LowPolyCanvas from './canvas.js';
import React from 'react';

require('./index.scss');

export default class LowPoly extends React.Component {

  componentDidMount() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    LowPolyCanvas.initCanvas(
      this.canvas,
      window.innerWidth,
      window.innerHeight
    );
  }

  handleTriangulate = () => {
    LowPolyCanvas.triangulate();
  }

  render() {
    return (
      <div className='low-poly'>
        <section className='controls'>
          <button onClick={this.handleTriangulate}>
            Triangulate
          </button>
          <span>2016-08-07</span>
          <span>Low Poly Art Maker with</span>
          <a href='https://github.com/mapbox/earcut'>Earcut</a>
        </section>
        <canvas ref={(ref) => this.canvas = ref}/>
      </div>
    );
  }

}
