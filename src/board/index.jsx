import _ from 'lodash';
import Controls from '../controls';
import React from 'react';
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import Tile from '../tile';

require('./index.scss');

const TILES = [
  'field',
  'mountain',
  'desert',
  'pasture',
  'forest',
  'quarry',
];

/*
     │ 0  │ 1  │ 2  │
  ┌──┴─┬──┴─┬──┴─┬──┴─┐
  │ 3  │ 4  │ 5  │ 6  │
┌─┴──┬─┴──┬─┴──┬─┴──┬─┴──┐
│ 7  │ 8  │ 9  │ 10 │ 11 │
└─┬──┴─┬──┴─┬──┴─┬──┴─┬──┘
  │ 12 │ 13 │ 14 │ 15 │
  └──┬─┴──┬─┴──┬─┴──┬─┘
     │ 16 │ 17 │ 18 │
*/

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boardModel: this.createBoardModel(),
    };
  }

  createBoardModel() {
    const boardModel = [];
    for (let i = 0; i < 19; i++) {
      boardModel.push(_.sample(TILES));
    }
    return boardModel;
  }

  createNewBoard() {
    this.setState({
      boardModel: this.createBoardModel(),
    });
  }

  createTile(isShown, x, y, width, terrain) {
    return (
      <Tile x={width} y={0} width={width} terrain={boardModel[0]}/>
    );
  }

  render() {
    const width = Math.min(window.innerWidth, window.innerHeight) / 5;
    const height = width - width / 7.5;

    const startingX = (
      window.innerWidth / 2 -
      (width * 5) / 2
    );

    const startingY = (
      window.innerHeight / 2 -
      (height * 5.5) / 2
    );

    let x = startingX;
    let y = startingY;
    const tiles = this.state.boardModel.map( (terrain, i) => {
      let y = startingY;
      x += width;

      if (i > 2 && i < 7) {
        y += height; 
      } else if (i > 6 && i < 12) {
        y += height * 2; 
      } else if (i > 11 && i < 16) {
        y += height * 3;
      } else if (i > 15) {
        y += height * 4;
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

      return (
        <Tile
          key={`${i}${terrain}`}
          x={x}
          y={y}
          width={width}
          terrain={terrain}
        />
      );
    });

    return (
      <div className='board'>

        <ReactCSSTransitionGroup
          transitionName='scale'
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeave={false}
        >

          {tiles}

        </ReactCSSTransitionGroup>
        <Controls onCreatePress={this.createNewBoard.bind(this)} />
      </div>
    );
  }

}
