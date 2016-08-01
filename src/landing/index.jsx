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
          <Link to='/magic_circle'>Magic Circle</Link>
          <Link to='/ray_tracer'>Ray Tracer</Link>
          <Link to='/catan_board'>Catan Board</Link>
        </div>
      </div>
    );
  }

}
