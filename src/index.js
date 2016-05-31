import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board/index.jsx';

require('./index.scss');
require('normalize.css/normalize.css');

ReactDOM.render(
  React.createElement(Board, null),
  document.querySelector('main')
);
