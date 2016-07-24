import Vec3 from './vec3';

export default class Ray {
  
  constructor(a = new Vec3(), b = new Vec3()) {
    this.a = a;
    this.b = b;
  }

  getOrigin() {
    return this.a;
  }

  getDirection() {
    return this.b;
  }

  getPointAtParameter(t = 1) {
    return this.a.add(this.b.multiply(t)); 
  }

}
