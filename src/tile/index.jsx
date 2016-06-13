import React from 'react';

require('./index.scss');

export default class Tile extends React.Component {

  render() {

    return (

      <svg
        viewBox="0 0 2281.78 2635.35"
        className='tile'
        style={{
          width: this.props.width,
          left: this.props.x,
          top: this.props.y,
        }}
      >
        <defs>
          <clipPath id="clip-path" transform="translate(-0.5 -0.58)">
            <polygon
              points={
                '1141.39 2635.35 0.5 1976.66 0.5 659.27 1141.39 0.58 ' +
                '2282.28 659.27 2282.28 1976.66 1141.39 2635.35'
              }
              style={{ fill: 'none' }}
            />
          </clipPath>
        </defs>
        <g style={{ clipPath: 'url(#clip-path)' }}>
          <image
            width="3300"
            height="3825"
            transform="scale(0.69 0.69)"
            xlinkHref={`/images/tiles/${this.props.terrain}.png`}
          />
        </g>
      </svg>
    );
  }
}
