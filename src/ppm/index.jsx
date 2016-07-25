import HitableList from './hitable_list';
import Ray from './ray';
import Sphere from './sphere';
import Vec3 from './vec3';

export default class PPM {

  static createGradient(width = 200, height = 100) {
    const ppm = new PPM(width, height);

    let index = 0;

    for (let j = height - 1; j >= 0; j--) {
      for (let i = 0; i < width; i++) {
        const [x, y] = ppm.indexToCoordinates(index++);

        ppm.setValue(
          x,
          y,
          [
            Math.ceil(i / width * 255),
            Math.ceil(j / height * 255),
            Math.ceil(0.2 * 255),
          ]
        );
      }
    }

    return ppm;
  }

  static createBlend(width = 800, height = 400) {
    const ppm = new PPM(width, height);

    const lowerLeftCorner = new Vec3(-2, -1, -1);
    const horizontal = new Vec3(4, 0, 0);
    const vertical = new Vec3(0, 2, 0);
    const origin = new Vec3(0, 0, 0);

    let index = 0;

    const color = function(ray = new Ray(), world = new HitableList()) {
      const lightSource = new Vec3(5, 10, 10); 
      const ambientLight = 0.1;

      const hitRecord = {};
      if (world.hit(ray, 0, Number.MAX_VALUE, hitRecord)) {
        const normal = hitRecord.normal.getUnit();
        const lightVector = lightSource.subtract(hitRecord.p).getUnit(); 
        let lightness = normal.dot(lightVector) + ambientLight;
        lightness = Math.min(1, Math.max(0, lightness));
        return hitRecord.color.multiply(lightness);
      }

      // Background
      const unitDirection = ray.getDirection().getUnit();
      const t = 0.5 * (unitDirection.getY() + 1);
      return new Vec3(1, 1, 1)
        .multiply(1 - t)
        .add(new Vec3(0.5, 0.7, 1).multiply(t));
    };

    const world = new HitableList([
      new Sphere(new Vec3(0, 0, -1), 0.5),
      new Sphere(new Vec3(0, -1e6 - 0.5, -1), 1e6)
    ]);

    const sampleSize = 4;

    for (let j = height - 1; j >= 0; j--) {
      for (let i = 0; i < width; i++) {
        let rgbVec = new Vec3(0, 0, 0);

        for (let s = 0; s < sampleSize; s++) {
          const u = (i + Math.random()) / width;
          const v = (j + Math.random()) / height;
          const ray = new Ray(
            origin,
            lowerLeftCorner
              .add(horizontal.multiply(u)).add(vertical.multiply(v)).getUnit()
          );

          rgbVec = rgbVec.add(color(ray, world));

        }

        rgbVec = rgbVec.divide(sampleSize);
        const [x, y] = ppm.indexToCoordinates(index++);

        ppm.setValue(
          x,
          y,
          [
            Math.ceil(rgbVec.getX() * 255),
            Math.ceil(rgbVec.getY() * 255),
            Math.ceil(rgbVec.getZ() * 255),
          ]
        );
      }
    }

    return ppm;
  }

  constructor(width = 200, height = 200) {
    this.width = width;
    this.height = height;
    this.values = [];
    this.startString = `P3\n${width} ${height}\n255\n`;
    this.initialize();
  }

  initialize() {
    for (var i = 0; i < this.width * this.height; i++) {
      this.values[i] = [ 0, 0, 0 ];
    }
  }

  coordinateToIndex(x, y) {
    return x + y * this.width; 
  }

  indexToCoordinates(index) {
    return [index % this.width, Math.floor(index / this.width)];
  }

  getValue(x, y) {
    const index = this.coordinateToIndex(x, y);
    if (index > this.values.length) {
      throw new TypeError(`(${x}, ${y}) is out of bounds`);
    }
    return this.values[index];
  }

  setValue(x, y, rgb) {
    const index = this.coordinateToIndex(x, y);
    if (index > this.values.length) {
      throw new TypeError(`(${x}, ${y}) is out of bounds`);
    }

    if (rgb.length !== 3) {
      throw new TypeError(`rgb [${rgb}] is invalid`);
    }
    this.values[index] = rgb;
    return this;
  }

  getWidth() {
    return this.width; 
  }

  getHeight() {
    return this.height;
  }

  toString() {
    let str = this.startString;
    return str + this.values.map( (rgb, i) => {
      let value = rgb.join(' ') + ' ';

      if (
        (i + 1) / this.width === Math.floor( (i + 1) / this.width )
      ) {
        value = value.substring(0, value.length - 1);
        value += '\n';
      }
      return value;
    }).join('');
  }

  download() {
    const blob = new Blob(
      [ this.toString() ],
      { 'content-type': 'text/plain' }
    );
    const a = document.createElement('a');
    a.download = 'image.ppm';
    a.href = URL.createObjectURL(blob);
    const event = new MouseEvent('click');
    a.dispatchEvent(event);
    URL.revokeObjectURL(a.src);
  }

  renderToCanvas(canvas) {
    if (canvas == null) {
      return;
    }
    canvas.width = this.width;
    canvas.height = this.height;
    let context = canvas.getContext('2d');
    let imageData = context.createImageData(this.width, this.height);

    for (let i = 0; i < this.values.length; i++) {
      const rgb = this.values[i];
      const dataIndex = i * 4;
      imageData.data[dataIndex] = rgb[0];
      imageData.data[dataIndex + 1] = rgb[1];
      imageData.data[dataIndex + 2] = rgb[2];
      imageData.data[dataIndex + 3] = 255;
    }
    
    context.putImageData(imageData, 0, 0);
  }

}
