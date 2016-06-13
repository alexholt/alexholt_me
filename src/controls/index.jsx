import React from 'react';

require('./index.scss');

export default class Controls extends React.Component {

  render() {
    return (
      <div className='controls'>
        <button onClick={this.props.onCreatePress}>New Board</button> 
      </div>
    );
  }
}

Controls.defaultProps = {
  onCreatePress: () => {},
};

Controls.propTypes = {
  onCreatePress: React.PropTypes.func,
};
