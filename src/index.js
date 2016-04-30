import THREE from 'three';

require('normalize.css');

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 20;

var loader = new THREE.ObjectLoader();

loader.load(
  '/models/hex.json',
  function ( scene ) {

    //scene.children[0].children[0].material = material;
    var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight );

    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 0, 50 );
    scene.add( light );


    function render() {
      requestAnimationFrame( render );
      scene.children[0].rotation.x += 0.01;
      camera.rotation.z += 0.01;
      renderer.render( scene, camera );
    }

    render();
  }
);

