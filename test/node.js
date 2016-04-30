'use strict';

const expect = require('chai').expect;
const Node = require('../src/Node');

describe("A node for the graph that represents the entire game state", () => {
  it('can be instantiated with a type', () => {
    const tile = new Node({type: 'resource'});
    expect(tile.getType()).to.equal('resource');
  });

  it('will have a default type of resource if none is provided', () => {
    const tile = new Node();
    expect(tile.getType()).to.equal('resource');
  });

  it('can only be of types resource, station, or lane', () => {
    const tile = new Node({ type: 'foo' });
    expect(tile.isValid()).to.equal(false);
  });

  xit('can connect to a maximum of 6 other resource tiles', () => {
    const grain = new Node({ type: 'resource', value: 'grain' });
    const otherGrain = new Node({ type: 'resource', value: 'grain' });
    const ore = new Node({ type: 'resource', value: 'ore' });
    const brick = new Node({ type: 'resource', value: 'brick' });
    const wood = new Node({ type: 'resource', value: 'brick' });
    const sheep = new Node({ type: 'resource', value: 'sheep' });
    const village = new Node({ type: 'station', value: 'village' });

    grain.setNorth(ore);
    grain.setNorthWest(wood);
    grain.setWest(village);
    grain.setSouthWest(sheep);
    grain.setNorthEast(brick);

    expect(wood.giveResources()).to.eql([village]);
  });
});
