import React from 'react';

require('./terrain_table.scss');

const BOARD_SIZE = 19;

export default class TerrainTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDesertCentered: true,
    };
  }

  createDropDown(terrain) {
    let options = [];

    for (let i = 0; i <= BOARD_SIZE; i++) {
      options.push(
        <option selected={this.props[terrain] === i} key={i}>{i}</option>
      );
    }

    return (
      <select>
        {options}
      </select>
    );
  }

  render() {
    return (
      <div className='terrain-table'>

        <div className='row'>
          <label>Desert</label>
          <div className='suboption'>
            <label className='small'>Centered</label>
            <input checked={this.state.isDesertCentered} type='checkbox' />
          </div>
          { this.createDropDown('desert') }
        </div>

        <div className='row'>
          <label>Field</label>
          { this.createDropDown('field') }
        </div>

        <div className='row'>
          <label>Forest</label>
          { this.createDropDown('forest') }
        </div>

        <div className='row'>
          <label>Pasture</label>
          { this.createDropDown('pasture') }
        </div>

        <div className='row'>
          <label>Mountain</label>
          { this.createDropDown('mountain') }
        </div>

        <div className='row'>
          <label>Quarry</label>
          { this.createDropDown('quarry') }
        </div>

      </div>
    );
  }

}

TerrainTable.defaultProps = {
  desert: 1,
  field: 4,
  forest: 4,
  pasture: 4,
  mountain: 3,
  quarry: 3,
};

TerrainTable.propTypes = {
  desert: React.PropTypes.number,
  field: React.PropTypes.number,
  forest: React.PropTypes.number,
  pasture: React.PropTypes.number,
  mountain: React.PropTypes.number,
  quarry: React.PropTypes.number,
};
