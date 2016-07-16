import React from 'react';

require('./index.scss');

export default class Overlay extends React.Component {

  render() {
    return (
      <div
        className='overlay'
        style={this.props.isOpen ? {} : {display: 'none'}}
      >
        <div
          className='content'
          dangerouslySetInnerHTML={{
            __html: this.props.children 
          }}
        >
        </div>
      </div>
    );
  }
}
