const controlObj = {};

export default {
  setup: (camera) => {
    controlObj.camera = camera;

    document.addEventListener('mousemove', (event) => {
        if (controlObj.shouldRotate) {
          controlObj.scene.children[0].rotation.x += 0.1;
        }
          //controlObj.scene.children[0].rotation.y -= 0.1;
    });

    document.addEventListener('wheel', (event) => {
      event.preventDefault(); 
      let oldPos = controlObj.camera.position;
      if (event.deltaY > 0) {
        if (!controlObj.shouldRotate) {
          controlObj.camera.position.set( oldPos.x, oldPos.y, oldPos.z + 0.1);
        }
      } else {
        if (controlObj.shouldRotate) {
          controlObj.scene.children[0].rotation.y -= 0.1;
        } else {
          controlObj.camera.position.set( oldPos.x, oldPos.y, oldPos.z - 0.1);
        }
      }
    });

    document.addEventListener('mousedown', (event) => {
      event.preventDefault();
      console.log('down')
      controlObj.shouldRotate = true;
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();
      controlObj.shouldRotate = false;
    });

  },

  setScene: (scene) => {
    controlObj.scene = scene;
  }
};
