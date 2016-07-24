import Hitable from './hitable';
import Ray from './ray';
import Vec3 from './vec3';

export default class Sphere extends Hitable {

  constructor(center = new Vec3(), radius = 1) {
    super();
    this.center = center;
    this.radius = radius;
  }

  hit(ray, tMin, tMax, hitRecord) {
    const oc = ray.getOrigin().subtract(this.center);
    //const a = ray.getDirection().dot(ray.getDirection());
    //const b = oc.dot(ray.getDirection()) * 2;
    //const c = oc.dot(oc) - this.radius * this.radius;
    const direction = ray.getDirection();
    const origin = ray.getOrigin().subtract(this.center) ;

    const a = direction.getX() * direction.getX() +
      direction.getY() * direction.getY() +
      direction.getZ() * direction.getZ();

    const b = 2 *
      (origin.x * direction.x + origin.y * direction.y + origin.z * direction.z);

    const c = origin.x * origin.x +
      origin.y * origin.y +
      origin.z * origin.z - this.radius * this.radius;

    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      let temp = (-b - Math.sqrt(discriminant)) / (2 * a);
      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;
        hitRecord.p = ray.getPointAtParameter(hitRecord.t);
        hitRecord.normal = hitRecord.p.subtract(this.center).divide(this.radius);
        return true;
      }
      temp = (-b + Math.sqrt(discriminant)) / (2 * a);
      if (temp < tMax && temp > tMin) {
        hitRecord.t = temp;
        hitRecord.p = ray.getPointAtParameter(hitRecord.t);
        hitRecord.normal = hitRecord.p.subtract(this.center).divide(this.radius);
        return true;
      }
    }
    return false;
  }

}
