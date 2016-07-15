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
          <Link to='/settlers'>Settlers</Link>
          <Link to='/three_things'>Three Things</Link>
          <Link to='/settlers_canvas'>Settlers Canvas</Link>
          <Link to='/magic_circle'>Magic Circle</Link>
        </div>
      </div>
    );
  }

}
