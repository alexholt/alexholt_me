import React from 'react';

require('./index.scss');

export default class Overlay extends React.Component {

  render() {
    return (
      <div
        className={ 'overlay' + (this.props.isOpen ? ' reveal' : '') }
      >
        <div className='close'
          onClick={this.props.onClose}
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/down-arrow.svg') 
          }}
        />
        <div
          className='content'
          dangerouslySetInnerHTML={{
            __html: this.props.children 
          }}
        />
      </div>
    );
  }
}

Overlay.defaultProps = {
  onClose: () => {},
};

Overlay.propTypes = {
  onClose: React.PropTypes.func,
};
