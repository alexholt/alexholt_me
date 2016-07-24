const expect = require('chai').expect;

import Vec3 from '../src/ppm/vec3.js';

describe('Vec3', () => {
  let subject;
  beforeEach( () => {
    subject = new Vec3();  
  });

  describe('#ctor', () => {

    it('should set reasonable defaults', () => {
      expect(subject.getX()).to.be.a('number'); 
      expect(subject.getY()).to.be.a('number'); 
      expect(subject.getZ()).to.be.a('number'); 
    });

  });

  describe('#add', () => {
    
    it('should add with another vec3 to form a new vec3', () => {
      let anotherVec = new Vec3(1, 1, 1);
      let newVec = subject.add(anotherVec);
      expect(subject.getX()).to.equal(0);
      expect(subject.getY()).to.equal(0);
      expect(subject.getZ()).to.equal(0);
      expect(newVec.getX()).to.equal(1);
      expect(newVec.getY()).to.equal(1);
      expect(newVec.getZ()).to.equal(1);
    });
    
  });

  describe('#subtract', () => {
    
    it('should subtract with another vec3 to form a new vec3', () => {
      let anotherVec = new Vec3(1, 1, 1);
      let newVec = subject.subtract(anotherVec);
      expect(subject.getX()).to.equal(0);
      expect(subject.getY()).to.equal(0);
      expect(subject.getZ()).to.equal(0);
      expect(newVec.getX()).to.equal(-1);
      expect(newVec.getY()).to.equal(-1);
      expect(newVec.getZ()).to.equal(-1);
    });
    
  });

});

