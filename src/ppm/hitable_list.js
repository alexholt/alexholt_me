import Hitable from './hitable';

export default class HitableList extends Hitable {

  constructor(list = []) {
    super();
    this.list = list;
  }

  hit(ray, tMin, tMax, hitRecord) {
    let hasHitAnything = false;
    let closestSoFar = tMax;
    for (let i = 0; i < this.list.length; i++) {
      const tempRecord = {};
      if (this.list[i].hit(ray, tMin, closestSoFar, tempRecord)) {
        hasHitAnything = true;
        closestSoFar = tempRecord.t;
        hitRecord.t = tempRecord.t;
        hitRecord.p = tempRecord.p;
        hitRecord.normal = tempRecord.normal;
      }
    }
    return hasHitAnything;
  }

}
