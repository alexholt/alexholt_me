const CIRCLE_BORDER = 40;
const MAX = 1000;
const ICE = '#18e8ff';

let needsRender = true;
let multiplier = 858;
let numbers = 600;

export function setDivisor(value = 1) {
  numbers = value; 
  needsRender = true;
}

export function setMultiplier(value = 1) {
  multiplier = value; 
  needsRender = true;
}

export function getDivisor() {
  return numbers;
}

export function getMultiplier() {
  return multiplier;
}

export function startUpCircle() {

  const canvasElement = document.querySelector('canvas');
  const context = canvasElement.getContext('2d');
  
  window.addEventListener('resize', function () {
    needsRender = true;  
  });
  
  function scaleCanvas(element, width, height) {
    const context = element.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    element.width = width * ratio;
    element.height = height * ratio;
    context.scale(ratio, ratio);
  }
  
  function connectNumbers(context, start, end, centerX, centerY, radius) {
    const halfway = Math.floor(numbers / 2);
    let startX = centerX - radius * Math.sin(start * Math.PI / halfway);
    const startY = centerY - radius * Math.cos(start * Math.PI / halfway);
    
    let endX = centerX - radius * Math.sin(end * Math.PI / halfway);
    const endY = centerY - radius * Math.cos(end * Math.PI / halfway);
    
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
  
  function render(time) {
    window.requestAnimationFrame(render);
    
    if (!needsRender) {
      return;
    }
    
    const { width, height } = canvasElement.getBoundingClientRect();
    
    if (width <= 0 || height <= 0) {
      return;
    }
    
    scaleCanvas(canvasElement, width, height);
    const circleDiameter = Math.min(width, height) - CIRCLE_BORDER * 2;
    const circleRadius = circleDiameter / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    context.width = width;
    context.height = height;
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'white';
    context.beginPath();
    context.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    context.stroke();
    
    context.strokeStyle = ICE;
  
    for (let i = 0; i < numbers; i++) {
      let startNum = i;
      let endNum = (startNum * multiplier) % numbers; 
      connectNumbers(context, startNum, endNum, centerX, centerY, circleRadius);
    }
    
    needsRender = false;
  }
  
  window.requestAnimationFrame(render); 
}
