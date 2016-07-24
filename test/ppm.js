const expect = require('chai').expect;

import PPM from '../src/ppm/index.jsx';

describe('PPM', () => {
  let subject;
  beforeEach( () => {
    subject = new PPM();  
  });

  describe('#ctor', () => {

    it('should set reasonable defaults', () => {
      expect(subject.getWidth()).to.be.a('number'); 
      expect(subject.getHeight()).to.be.a('number'); 
    });

  });

  describe('#getValue', () => {

    it('should provide individual values', () => {
      expect(subject.getWidth()).to.be.a('number'); 
      expect(subject.getHeight()).to.be.a('number'); 

      for (let i = 0; i < subject.getWidth(); i++) {
        for (let j = 0; j < subject.getHeight(); j++) {
          expect(subject.getValue(0, 0)).to.eql([ 0, 0, 0 ]);
        }
      }
    });

  });

  describe('#setValue', () => {

    it('should allow setting individual values', () => {
      subject.setValue(0, 0, [255, 255, 255]);
      expect(subject.getValue(0, 0)).to.eql([ 255, 255, 255 ]); 
    });

  });

  describe('#indexToCoordinates, #coordinateToIndex', () => {

    it('should convert from index to coordinate pair', () => {
      const width = subject.getWidth();
      expect(subject.indexToCoordinates(width)).to.eql([0, 1]); 
      expect(subject.coordinateToIndex(0, 1)).to.eql(width);
      expect(subject.coordinateToIndex(1, 1)).to.eql(width + 1);
      subject = new PPM(10, 10);
      subject.setValue(0, 0, [255, 255, 255]);
    });


  });


});

