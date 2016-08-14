import THREE from 'three';

export default class Player {
  
  constructor(color = 0xffff00, startingPosition = new THREE.Vector3(0, -1, 0)) {
    this.material = new THREE.MeshLambertMaterial({ color });
    this.isLoaded = false;
    this.startingPosition = startingPosition;
  }

  addToScene(scene) {
    const modelLoader = new THREE.OBJLoader();
    modelLoader.load( '/models/figure.obj', (object) => {
      this.isLoaded = true;
      this.mesh = object;
      this.mesh.position.set(
        this.startingPosition.x,
        this.startingPosition.y,
        this.startingPosition.z
      );
      for (const child of this.mesh.children) {
        child.material = this.material;
      }
      scene.add(this.mesh);
    });
  }

}
