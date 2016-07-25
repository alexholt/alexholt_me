import Overlay from '../overlay';
import PPM from '../ppm';
import Ray from '../ppm/ray';
import React from 'react';
import Vec3 from '../ppm/vec3';

require('./index.scss');

export default class RayTracer extends React.Component {

  constructor(props) {
    super(props);
    const startTime = Date.now();
    this.ppm = PPM.createBlend();
    const time = ((Date.now() - startTime) / 1000).toFixed(3);
    this.state = {
      time,
      isInfoOpen: /\/info$/.test(location.pathname),
    };
  }

  openInfo() {
    window.history.replaceState({}, {}, '/ray_tracer/info');
    this.setState({
      isInfoOpen: true,
    });
  }

  closeInfo() {
    window.history.replaceState({}, {}, '/ray_tracer');
    this.setState({
      isInfoOpen: false,
    });
  }

  download() {
    this.ppm.download();
  }

  render() {
    return (
      <div className='ray-tracer'>

        <Overlay
          onClose={this.closeInfo.bind(this)}
          isOpen={this.state.isInfoOpen}
        >
          {require('./info.md')}
        </Overlay>       

        <div className='controls'>
          <button onClick={this.download.bind(this)}>Download PPM</button>
          <span className='timer'>{ `${this.state.time}s`}</span>
        </div>
        <canvas ref={(ref) => {
          this.canvas = ref;
          this.ppm.renderToCanvas(this.canvas);
        }}/>

        <div
          className='info'
          onClick={this.openInfo.bind(this)}
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/question.svg') 
          }}
        />
      </div>
    );
  }

}
