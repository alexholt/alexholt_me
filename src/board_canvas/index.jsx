import Board from '../board';
import Controls from '../controls';
import React from 'react';

export default class BoardCanvas extends Board {
  
  constructor(props) {
    super(props);
    this.state.isRunning = false;
    this.state.width = document.documentElement.clientWidth;
    this.state.height = document.documentElement.clientHeight;
    this.tiles = {};
  }

  componentDidMount() {
    document.title = 'Settlers';
  }

  initCanvas(canvas) {
    if (!canvas) {
      return;
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.state.width, this.state.height);
    this.boardModel = this.createBoardModel();
    this.renderCanvas();
  }

  getTile(tileName) {
    if (this.tiles[tileName]) {
      return this.tiles[tileName];
    }
    const tile = document.createElement('img');
    tile.src = require(`../../public/images/tiles/${tileName}.png`);
    this.tiles[tile] = tile;
    return tile;
  }

  scaleCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    this.canvas.width = this.state.width * ratio;
    this.canvas.height = this.state.height * ratio;
    this.canvas.style.width = this.state.width + 'px';
    this.canvas.style.height = this.state.height + 'px';
    this.context.scale(ratio, ratio);
  }

  renderCanvas() {

    this.state.width = document.documentElement.clientWidth;
    this.state.height = document.documentElement.clientHeight;

    this.scaleCanvas();

    this.context.clearRect(0, 0, this.state.width, this.state.height);

    const width = Math.ceil(Math.min(this.state.width, this.state.height) / 6);
    const height = width * 3825 / 3300;

    const startingX = (
      this.state.width / 2 -
      (width * 5) / 2
    );

    const overlapOffset = Math.ceil(height / 4);

    const startingY = (
      this.state.height / 2 -
      (height - overlapOffset) * 5 / 2
    );

    let x = startingX;

    const tiles = this.state.boardModel.map( (terrain, i) => {
      let y = startingY;
      x += width;

      if (i > 2 && i < 7) {
        y += height - overlapOffset; 
      } else if (i > 6 && i < 12) {
        y += (height - overlapOffset) * 2; 
      } else if (i > 11 && i < 16) {
        y += (height - overlapOffset) * 3;
      } else if (i > 15) {
        y += (height - overlapOffset) * 4;
      }

      if (i === 3) {
        x = startingX + width / 2;
      } else if (i === 7) {
        x = startingX;
      } else if (i === 12) {
        x = startingX + width / 2;
      } else if (i === 16) {
        x = startingX + width;
      }

      const imgTile = this.getTile(terrain);

      return {
        x,
        y,
        width,
        height,
        img: imgTile,
      };
    });

    for (let tile of tiles) {
      this.context.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
    }

    if (this.state.isRunning) {
      window.requestAnimationFrame(this.renderCanvas.bind(this)); 
    }

  }

  render() {
    return (
      <div className='board'>
        <Controls onCreatePress={this.createNewBoard.bind(this)} />
        <canvas
          width={this.state.width}
          height={this.state.height}
          ref={(canvas) => this.initCanvas(canvas) }
        />
      </div>
    );
  }

};
