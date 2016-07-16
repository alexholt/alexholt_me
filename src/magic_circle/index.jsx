import {
  startUpCircle,
  setDivisor,
  setMultiplier,
  getMultiplier,
  getDivisor,
} from './canvas';

import { isNil } from 'lodash';
import Overlay from '../overlay';
import React from 'react';
import Slider from 'rc-slider';

require('./index.scss');
require('rc-slider/assets/index.css');

export default class MagicCircle extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      minDivision: 1,
      maxDivision: 100,
      minMultiplier: 1,
      maxMultiplier: 49,
      isInfoOpen: false,
    };
  }

  componentDidMount() {
    document.title = 'Magic Circle';
    startUpCircle();
    var { multiplier, divisor } = this.getParams();
    if (isNil(multiplier) || isNil(divisor)) {
      this.updateParams();
    } else {
      setDivisor(divisor);
      setMultiplier(multiplier);
    }
  }

  openInfo() {
    this.setState({
      isInfoOpen: !this.state.isInfoOpen,
    });
  }

  onDivisorChange(value) {
    setDivisor(value);
    this.updateParams();
  }

  onMultiplierChange(value) {
    setMultiplier(value);
    this.updateParams();
  }

  updateParams() {
    window.history.replaceState(
      {},
      {},
      `?d=${getDivisor()}&m=${getMultiplier()}`
    );
  }

  getParams() {
    let search = location.search;
    if (search.length === 0) {
      return {};
    }

    let match = search.match(/d=([^&]+)/);
    let divisor = 0;
    if (match !== null) {
      divisor = match[1];
    }

    match = search.match(/m=([^&]+)/);
    let multiplier = 0;
    if (match !== null) {
      multiplier = match[1];
    }

    return {
      divisor: parseInt(divisor, 10),
      multiplier: parseInt(multiplier, 10)
    };
  }

  render() {
    const style = {
      width: '80%',
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    return (
      <div className='magic-circle'>

        <Overlay isOpen={this.state.isInfoOpen}>
          {require('./info.md')}
        </Overlay>       

        <div className='slider-container top' style={style}>
          <Slider
            style={style}
            defaultValue={getDivisor()}
            min={this.state.minDivision}
            max={this.state.maxDivision}
            onChange={this.onDivisorChange.bind(this)} 
          />
          <label>Divisor</label>
        </div>

        <div className='slider-container bottom' style={style}>
          <Slider
            style={style}
            defaultValue={getMultiplier()}
            min={this.state.minMultiplier}
            max={this.state.maxMultiplier}
            onChange={this.onMultiplierChange.bind(this)}
          />
          <label>Multiplier</label>
        </div>

        <canvas />
        
        <div
          className='info'
          onClick={this.openInfo.bind(this)}
          dangerouslySetInnerHTML={{
            __html: require('../../public/images/question.svg') 
          }}
        >
        </div>
      </div>
    );
  }

}
