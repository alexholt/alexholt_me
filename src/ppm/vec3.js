export default class Vec3 {

  constructor(x = 0, y = 0, z = 0) {
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
      throw new TypeError('Vec3 constructor takes 3 numbers'); 
    }
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getZ() {
    return this.z;
  }

  toString() {
    return `(${x}, ${y}, ${z})`;
  }

  add(anotherVec = new Vec3()) {
    const x = this.x + anotherVec.getX();
    const y = this.y + anotherVec.getY();
    const z = this.z + anotherVec.getZ();
    return new Vec3(x, y, z);
  }

  subtract(anotherVec = new Vec3()) {
    let x = this.x - anotherVec.getX();
    let y = this.y - anotherVec.getY();
    let z = this.z - anotherVec.getZ();
    return new Vec3(x, y, z);
  }

  multiply(anotherVec = new Vec3()) {
    if (typeof anotherVec === 'number') {
      let value = anotherVec;
      return new Vec3( this.x * value, this.y * value, this.z * value);
    }
    let x = this.x * anotherVec.getX();
    let y = this.y * anotherVec.getY();
    let z = this.z * anotherVec.getZ();
    return new Vec3(x, y, z);
  }
  
  divide(anotherVec = new Vec3()) {
    if (typeof anotherVec === 'number') {
      let value = anotherVec;
      return new Vec3( this.x / value, this.y / value, this.z / value);
    }
    let x = this.x / anotherVec.getX();
    let y = this.y / anotherVec.getY();
    let z = this.z / anotherVec.getZ();
    return new Vec3(x, y, z);
  }

  getUnit() {
    const k = 1 / Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
    const x = this.x * k;
    const y = this.y * k;
    const z = this.z * k;
    return new Vec3(x, y, z);
  }

  dot(anotherVec = new Vec3()) {
    return (
      this.x * anotherVec.getX() +
      this.y * anotherVec.getY() +
      this.z * anotherVec.getZ()
    );
  }
}
