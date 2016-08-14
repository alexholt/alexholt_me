import React from 'react';
import { Link } from 'react-router';

require('./index.scss');

export default class Landing extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='outer-container'>
        <div
          className='logo-container'
          dangerouslySetInnerHTML={{ __html: require('../../misc/a.svg') }}
        >
        </div>
        <div className='link-container'>
          <div className='half-circle'></div>
          <Link to='/magic-circle'>Magic Circle</Link>
          <Link to='/ray-tracer'>Ray Tracer</Link>
          <Link to='/catan-board'>Catan Board</Link>
          <Link to='/low-poly'>Low Poly</Link>
          <Link to='/runaround'>Runaround</Link>
        </div>
      </div>
    );
  }

}
