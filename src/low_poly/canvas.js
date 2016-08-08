import { scaleCanvas, scalePoint, getRatio } from '../canvas_tools';
import { method, toArray } from 'lodash';
import earcut from 'earcut';

let canvas, context, width, height, image;

let shouldTriangulate = false;
let done = false;

let mousePosition = [ 0, 0 ];

let colorAtPointer = '#000000';

const points = [];

const LowPoly = {

  initCanvas(lowPolyCanvas, canvasWidth, canvasHeight) {
    canvas = lowPolyCanvas;
    width = canvasWidth;
    height = canvasHeight;
    context = canvas.getContext('2d');
    scaleCanvas(canvas, width, height); 
    LowPoly.attachEventHandlers(canvas);
    LowPoly.render();
  },

  render() {
    context.clearRect(0, 0, width, height);
    const ratio = getRatio(context);
    if (image) {
      context.drawImage(
        image,
        (width / 2) - (image.width / ratio) / 2,
        (height / 2) - (image.height / ratio) / 2,
        image.width / ratio,
        image.height / ratio
      );
    }
    LowPoly.drawPoints();
    if (shouldTriangulate) {
      const triangles = earcut(points);
      LowPoly.drawTriangles(triangles);
    } else {
      window.requestAnimationFrame(LowPoly.render);
    }
    LowPoly.drawPositionText();
  },

  getAverageColor(trianglePoints) {
    const ratio = getRatio(context);
    const imageData = context.getImageData(
      0, 0, width * ratio, height * ratio
    ); 
    
    const x = Math.min(
      trianglePoints[0],
      trianglePoints[2],
      trianglePoints[4],
    );

    const x2 = Math.max(
      trianglePoints[0],
      trianglePoints[2],
      trianglePoints[4],
    );

    const y = Math.min(
      trianglePoints[1],
      trianglePoints[3],
      trianglePoints[5],
    );
    
    const y2 = Math.max(
      trianglePoints[1],
      trianglePoints[3],
      trianglePoints[5],
    );

    let color = [0, 0, 0];
    let count = 0;
    for (let testX = x; testX < x2; testX++) {
      for (let testY = y; testY < y2; testY++) {
        if (context.isPointInPath(testX * ratio, testY * ratio)) {
          const i = testX * ratio +
            Math.floor(testY * ratio) *
            width * ratio;
          const rgb = imageData.data.slice(i * 4, i * 4 + 3);
          color[0] += rgb[0];
          color[1] += rgb[1];
          color[2] += rgb[2];
          count++;
        }
      }
    }

    if (count === 0) {
      console.log('no points in path');
    }

    return '#' + color
      .map( (val) => Math.floor(val / count).toString(16) )
      .map(LowPoly.padString)
      .join('');
  },

  drawPoints() {
    context.strokeStyle = 'yellow';
    context.beginPath();
    for (let i = 0; i < points.length; i += 2) {
      let x = points[i];
      let y = points[i + 1];
      context.lineTo(x, y);
    }
      
    if (shouldTriangulate) {
      context.closePath();
    } else {
      context.stroke();
    }
  },

  drawTriangles(triangles) {
    for (let i = 0; i < triangles.length; i += 3) {
      context.beginPath();

      const trianglePoints = [
        points[triangles[i] * 2],
        points[(triangles[i] * 2) + 1],

        points[triangles[i + 1] * 2],
        points[(triangles[i + 1] * 2) + 1],

        points[triangles[i + 2] * 2],
        points[(triangles[i + 2] * 2) + 1],
      ];

      context.moveTo(
        trianglePoints[0],
        trianglePoints[1],
      );

      context.lineTo(
        trianglePoints[2],
        trianglePoints[3],
      );

      context.lineTo(
        trianglePoints[4],
        trianglePoints[5],
      );
   
      context.closePath();
      
      context.fillStyle = LowPoly.getAverageColor(trianglePoints);

      context.fill();
    }
  },

  drawPositionText() {
    const textHeight = 20;
    context.fillStyle = 'white';
    context.font = `${textHeight}px monospace`;
    const text = mousePosition[0] + ', ' + mousePosition[1];
    let measurement = context.measureText(text);
    
    if (location.hash === '#debug') {
      context.fillText(
        text,
        width - measurement.width,
        height - 20
      );
   
      context.fillText(
        colorAtPointer,
        width - measurement.width,
        height - 1
      );
    }
 
    let helpMessage =
      'Drag and drop an image here to begin';
    if (!image) {
      measurement = context.measureText(helpMessage);
      context.fillText(
        helpMessage,
        width / 2 - measurement.width / 2,
        height / 2
      );
    } else if (points.length === 0) {
      helpMessage = 'Now click around. Then press the button';
      measurement = context.measureText(helpMessage);
      context.fillText(
        helpMessage,
        width / 2 - measurement.width / 2,
        20
      );
    }
  },

  getColorAtPointer() {
    const ratio = getRatio(context);
    const imageData = context.getImageData(
      0, 0, width * ratio, height * ratio
    ); 

    const i = mousePosition[0] * ratio +
      Math.floor(mousePosition[1] * ratio) *
      width * ratio;

    return '#' + toArray(imageData.data.slice(i * 4, i * 4 + 3))
      .map(method('toString', 16))
      .map(LowPoly.padString)
      .join('');
  },

  padString(str) {
    const length = 2;
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  },
    
  attachEventHandlers(canvas) {
    canvas.addEventListener('click', (event) => {
      mousePosition = [ event.pageX, event.pageY ];
      points.push(event.pageX, event.pageY);
    });

    canvas.addEventListener('mousemove', (event) => {
      mousePosition = [ event.pageX, event.pageY ];
      colorAtPointer = LowPoly.getColorAtPointer();
    });

    canvas.addEventListener('dragover', method('preventDefault'));
    canvas.addEventListener('dragend', method('preventDefault'));

    canvas.addEventListener('drop', (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      var reader = new FileReader();

      reader.onload = (event) => {
        image = document.createElement('img');
        image.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });
  },

  triangulate() {
    shouldTriangulate = true;
  },

};

export default LowPoly;
