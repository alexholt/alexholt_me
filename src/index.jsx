import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Board from './board/index.jsx';
import BoardCanvas from './board_canvas/index.jsx';
import Landing from './landing/index.jsx';
import MagicCircle from './magic_circle/index.jsx';
import ThreeThings from './three_things/index.jsx';

require('./index.scss');
require('normalize.css/normalize.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='/settlers' component={Board} />
    <Route path='/settlers_canvas' component={BoardCanvas} />
    <Route path='/three_things' component={ThreeThings} />
    <Route path='/magic_circle' component={MagicCircle} />
  </Router>,
  document.querySelector('main')
);
