import App from './app';
import React from 'react';

require('./index.scss');

export default class Runaround extends React.Component {

  componentDidMount() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    App.initCanvas(
      this.canvas,
      window.innerWidth,
      window.innerHeight
    );
    window.addEventListener('keydown', this.handleKey.bind(this));
    window.addEventListener('keyup', this.handleKey.bind(this));
    window.addEventListener('resize', App.resize); 
    window.addEventListener('orientationchange', App.resize);
  }

  componentWillUnmount() {
    // TODO: Remove event listeners
  }

  handleKey(event) {
    const isOn = event.type === 'keydown';
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        App.moveForward(isOn);
        break;
      case 'ArrowDown':
      case 's':
        App.moveBackward(isOn);
        break;
      case 'ArrowLeft':
        App.moveLeft(isOn);
        break;
      case 'ArrowRight':
        App.moveRight(isOn);
        break;
    }
  }

  render() {
    return (
      <div className='low-poly'>
        <canvas
          ref={(ref) => this.canvas = ref}
        />
      </div>
    );
  }

}
