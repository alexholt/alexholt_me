import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import CatanBoard from './board_canvas';
import Landing from './landing';
import MagicCircle from './magic_circle';
import RayTracer from './ray_tracer';

require('./index.scss');
require('normalize.css/normalize.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='/magic_circle' component={MagicCircle}>
      <Route path='info' component={MagicCircle} />
    </Route>
    <Route path='/ray_tracer' component={RayTracer}>
      <Route path='info' component={RayTracer} />
    </Route>
    <Route path='/catan_board' component={CatanBoard}>
      <Route path='info' component={CatanBoard} />
    </Route>
  </Router>,
  document.querySelector('main')
);
