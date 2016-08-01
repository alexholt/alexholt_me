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
    return (
      <span>
        <div
          className={
            'left arrow' +
            (this.props[terrain] === 0 ? ' disabled' : '')
          }
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/right-arrow.svg')
          }}
          onClick={() => {
            this.props.onUpdate({
              actionType: 'count-update',
              count: this.props[terrain] - 1,
              terrainType: terrain,
            });
          }}
        />
        <span className='terrain-name'>
          {this.props[terrain] + ' tiles'}
        </span>
        <div
          className={
            'right arrow' +
            (this.props.unassigned === 0 ? ' disabled' : '')
          }
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/right-arrow.svg')
          }}
          onClick={() => {
            this.props.onUpdate({
              actionType: 'count-update',
              count: this.props[terrain] + 1,
              terrainType: terrain,
            });
          }}
        />
      </span>
    );
  }

  render() {
    return (
      <div className='terrain-table'>

        <div className='row'>
          <label>Unassigned</label>
          <span className='terrain-name unassigned' >
            {this.props.unassigned + ' tiles'}
          </span>
        </div>

        <div className='row'>
          <label>Desert</label>
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
  unassigned: 0,
  desert: 1,
  field: 4,
  forest: 4,
  mountain: 3,
  pasture: 4,
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
