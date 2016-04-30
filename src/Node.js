'use strict';

class Node {

  constructor(props) {
    props = props || {};
    this.type = props.type || 'null';
    this.value = props.value || 'none';
    this.north = props.north;
    this.northEast = props.northEast;
  }

  isValid() {
    if (this.validTypes.indexOf(this.type) === -1) {
      return false;
    }
  }

  getType() {
    return this.type;
  }

}

Node.prototype.validTypes = [ 'resource', 'station', 'lane' ];
Node.prototype.validValues = {
  'resource': [ 'water', 'ore', 'brick', 'grain', 'desert', 'sheep', 'wood' ],
  'station': [ 'village', 'city', 'squire', 'knight', 'lord' ],
  'lane': [ 'ship', 'road', 'camel' ]
};

module.exports = Node;
