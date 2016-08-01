import React from 'react';
import Tile from '../tile';
import { init, addEventListener }
  from '../board_canvas/board_store.js';

require('./index.scss');

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }

  componentDidMount() {
    addEventListener('update', ({ board, counts }) => {
      this.setState({ board, counts });
    });
    init();
  }

}
