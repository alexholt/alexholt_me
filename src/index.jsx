import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './landing/index.jsx';
import MagicCircle from './magic_circle/index.jsx';

require('./index.scss');
require('normalize.css/normalize.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='/magic_circle' component={MagicCircle}>
      <Route path='info' component={MagicCircle} />
    </Route>
  </Router>,
  document.querySelector('main')
);
