import THREE from 'three';
import Player from './player';

// Needs to global to include the bonus modules
window.THREE = THREE;
require('three/examples/js/loaders/OBJLoader');
require('three/examples/js/controls/OrbitControls');

let canvas, width, height;
let scene, camera, renderer, controls;
let figure;

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

const App = {

  initCanvas(appCanvas, canvasWidth, canvasHeight) {
    canvas = appCanvas;
    width = canvasWidth;
    height = canvasHeight;

    scene = new THREE.Scene();
    const viewAngle = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 20000;
    window.camera = camera =
      new THREE.PerspectiveCamera( viewAngle, aspect, near, far);
    scene.add(camera);
    camera.position.set(15, 5, 10);
    camera.lookAt(scene.position);
  
    
    if (canvas.getContext('webgl')) {
      renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    } else {
      throw new Error('WebGL is not available');
    }

    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    renderer.setSize(width, height);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);

    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x8888ff }); 

    figure = new Player(); 
    figure.addToScene(scene);

    const enemy1 = new Player(0x0011aa, new THREE.Vector3(-10, -1, -10)); 
    enemy1.addToScene(scene);

    const enemy2 = new Player(0xff11aa, new THREE.Vector3(-10, -1, -20)); 
    enemy2.addToScene(scene);

    const sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 ); 
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(100, 50, -50);
    //scene.add(sphere);

    const textureLoader = new THREE.TextureLoader();
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    const floor = new THREE.Mesh(floorGeometry);

    textureLoader.load( '/images/background_tile.png', (floorTexture) => {
      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
      floorTexture.repeat.set( 100, 100 );
      const floorMaterial =
        new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
      floor.material = floorMaterial;
    });

    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    const skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    const skyBoxMaterial =
      new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    const skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);
  
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.0015 );

    App.render();
  },

  resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  },

  moveForward(isOn = true) {
    if (!figure.isLoaded) {
      return;
    }
    movement.forward = isOn;
  },

  moveBackward(isOn = true) {
    if (!figure.isLoaded) {
      return;
    }
    movement.backward = isOn;
  },

  moveLeft(isOn = true) {
    if (!figure.isLoaded) {
      return;
    }
    movement.left = isOn;
  },

  moveRight(isOn = true) {
    if (!figure.isLoaded) {
      return;
    }
    movement.right = isOn;
  },

  render() {
    const cameraDirection = camera.getWorldDirection();
    cameraDirection.projectOnPlane(new THREE.Vector3(0, 1, 0));
    const leftDirection = cameraDirection.clone();
    leftDirection.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2
    );

    if (movement.forward) {
      figure.mesh.position.x += cameraDirection.x;
      figure.mesh.position.z += cameraDirection.z;
      camera.position.x += cameraDirection.x;
      camera.position.z += cameraDirection.z;
    }

    if (movement.backward) {
      figure.mesh.position.x -= cameraDirection.x;  
      figure.mesh.position.z -= cameraDirection.z;
      camera.position.x -= cameraDirection.x;
      camera.position.z -= cameraDirection.z;
    }

    if (movement.left) {
      camera.position.x -= leftDirection.x;
      camera.position.z -= leftDirection.z;
    }

    if (movement.right) {
      camera.position.x += leftDirection.x;
      camera.position.z += leftDirection.z;
    }

    if (figure.isLoaded) {
      camera.lookAt(figure.mesh.position);
    }
    //controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(App.render);
  },

};

export default App;
