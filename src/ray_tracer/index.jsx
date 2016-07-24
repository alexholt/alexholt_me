import PPM from '../ppm';
import Ray from '../ppm/ray';
import React from 'react';
import Vec3 from '../ppm/vec3';

require('./index.scss');

export default class RayTracer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ppm: PPM.createBlend(),
    };
  }

  render() {
    return (
      <div className='ray-tracer'>
        <canvas ref={(ref) => {
          this.canvas = ref;
          this.state.ppm.renderToCanvas(this.canvas);
        }}/>
      </div>
    );
  }

}
