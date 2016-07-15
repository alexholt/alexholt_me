import React from 'react';

import TerrainTable from './terrain_table';

require('./index.scss');

export default class Controls extends React.Component {

  render() {
    return (
      <div className='controls'>
        <button onClick={this.props.onCreatePress}>New Board</button> 
        <TerrainTable />
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
