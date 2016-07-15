import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('./index.scss');

export default class ThreeThings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputValue: '',
    };
    this.backgroundString = '';
  }

  componentDidMount() {
    document.title = 'Three Things';
  }

  handleKeyPress(event) {
    if (event.charCode === 13 /* Enter */) {
      const items = this.state.items;

      if (items.length >= 3) {
        return;
      }

      items.push(this.state.inputValue);
      this.setState({
        items,
        inputValue: '',
      });
      this.updateBlob();
    }
  }

  updateBlob() {
    URL.revokeObjectURL(this.blobUrl);
    var blob = new Blob(
      [ this.state.items.join('\n\n') ],
      {type: 'text/plain'}
    );
    this.blobUrl = URL.createObjectURL(blob);
  }

  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  clearItem(i) {
    const items = this.state.items.slice();
    items.splice(i, 1);
    this.setState({
      items,
    });
  }

  buildListItems() {
    return this.state.items.map( (item, i) => {
      return (
        <li className='list-item' key={`${i}${item}`}>
          <span>{item}</span>
          <span
            className='clear'
            onClick={ () => this.clearItem(i) }
          >
          X
          </span>
        </li>
      );
    });
  }

  buildList() {
    return (
      <ol>
        <ReactCSSTransitionGroup
          transitionName='scale'
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeave={false}
        >
          { this.buildListItems() }
        </ReactCSSTransitionGroup>
      </ol>
    );
  }

  buildBackground() {
    const background = document.querySelector('.background');
    if (background === null) {
      return this.backgroundString;
    }

    const height = background.getBoundingClientRect().height;

    if (height < window.innerWidth) {
      this.backgroundString += 'writethreethings';
      setTimeout(() => {
        this.setState({});
      }, 0);
    }

    return this.backgroundString;
  }

  render() {
    return (
      <div className='three-things'>
        <section className='background'>
          { this.buildBackground() }
        </section>

        <section
          onKeyPress={this.handleKeyPress.bind(this)}
          className='foreground'
        >
          { this.buildList() }
          <input
            type='text'
            onChange={this.handleInputChange.bind(this)}
            value={this.state.inputValue}
            disabled={this.state.items.length >= 3}
          />
          <a download='three_things.txt' href={this.blobUrl}>Download</a>
        </section>
      </div>
    );
  }

}
