import { addEventListener, dispatch, init } from './board_store';
import Board from '../board';
import BoardActions from './board_actions';
import Controls from '../controls';
import { debounce } from 'lodash';
import Overlay from '../overlay';
import React from 'react';

export default class BoardCanvas extends Board {
  
  constructor(props) {
    super(props);
    this.state.isRunning = false;
    this.state.width = document.documentElement.clientWidth;
    this.state.height = document.documentElement.clientHeight;
    this.state.counts = {};
    this.state.isInfoOpen = /\/info$/.test(location.pathname);
    this.tiles = null;
    this.tileImages = {};
    this.debouncedRender = debounce(this::this.renderCanvas, 100);
  }

  openInfo() {
    window.history.replaceState({}, {}, '/catan_board/info');
    this.setState({
      isInfoOpen: true,
    });
  }

  closeInfo() {
    window.history.replaceState({}, {}, '/catan_board');
    this.setState({
      isInfoOpen: false,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    document.title = 'Settlers';
    window.addEventListener('resize', this.debouncedRender);
    window.addEventListener(
      'orientationchange', this.debouncedRender
    );
  }

  initCanvas(canvas) {
    if (!canvas) {
      return;
    }
    if (!this.canvas) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
    }
    if (this.state.isInfoOpen) {
      return;
    }
    this.context.clearRect(0, 0, this.state.width, this.state.height);
    this.debouncedRender();
  }

  getTile(tileName) {
    if (this.tileImages[tileName]) {
      return this.tileImages[tileName];
    }
    const tile = document.createElement('img');
    tile.src = require(`../../public/images/tiles/${tileName}.png`);
    tile.addEventListener('load', this.debouncedRender);
    this.tileImages[tileName] = tile;
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

  handleUpdate(update) {
    dispatch(update);
  }

  buildTiles() {
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

    return this.state.board.map( (terrain, i) => {
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
  }

  renderCanvas() {
    this.state.width = document.documentElement.clientWidth;
    this.state.height = document.documentElement.clientHeight;

    this.scaleCanvas();

    this.context.clearRect(0, 0, this.state.width, this.state.height);

    this.tiles = this.buildTiles();

    for (let tile of this.tiles) {
      this.context.drawImage(
        tile.img, tile.x, tile.y, tile.width, tile.height
      );
    }

    if (this.state.isRunning) {
      window.requestAnimationFrame(this::this.renderCanvas); 
    }

  }

  render() {
    return (
      <div className='board'>
        <Overlay
          onClose={this.closeInfo.bind(this)}
          isOpen={this.state.isInfoOpen}
        >
          {require('./info.md')}
        </Overlay>       

        <Controls
          onCreatePress={this::this.handleUpdate}
          onUpdate={this::this.handleUpdate}
          {...this.state.counts}
        />
        <canvas
          width={this.state.width}
          height={this.state.height}
          ref={(canvas) => this.initCanvas(canvas) }
        />
        <div
          className='info'
          onClick={this.openInfo.bind(this)}
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/question.svg') 
          }}
        />
      </div>
    );
  }

};
