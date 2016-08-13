import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import CatanBoard from './board_canvas';
import Landing from './landing';
import LowPoly from './low_poly';
import MagicCircle from './magic_circle';
import RayTracer from './ray_tracer';

require('./index.scss');
require('normalize.css/normalize.css');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='/magic-circle' component={MagicCircle}>
      <Route path='info' component={MagicCircle} />
    </Route>
    <Route path='/ray-tracer' component={RayTracer}>
      <Route path='info' component={RayTracer} />
    </Route>
    <Route path='/catan-board' component={CatanBoard}>
      <Route path='info' component={CatanBoard} />
    </Route>
    <Route path='/low-poly' component={LowPoly} />  
  </Router>,
  document.querySelector('main')
);
