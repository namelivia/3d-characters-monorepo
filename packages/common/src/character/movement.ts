import * as THREE from "three";
export class Movement {
  move = (gltf: THREE.Object3D) => {
    console.log("Movement not implemented");
    console.log(gltf);
  };
}

export class SpinLeft extends Movement {
  addRotation(gltf: THREE.Object3D, y: number) {
    gltf.rotation.y += y;
  }

  move = (gltf: THREE.Object3D) => {
    this.addRotation(gltf, 0.01);
  };
}

export class SpinRight extends Movement {
  addRotation(gltf: THREE.Object3D, y: number) {
    gltf.rotation.y -= y;
  }

  move = (gltf: THREE.Object3D) => {
    this.addRotation(gltf, 0.01);
  };
}

export class MoveBack extends Movement {
  addZ(gltf: THREE.Object3D, z: number) {
    gltf.position.z -= z;
  }

  move = (gltf: THREE.Object3D) => {
    this.addZ(gltf, 0.01);
  };
}

export class MoveFront extends Movement {
  addZ(gltf: THREE.Object3D, z: number) {
    gltf.position.z += z;
  }

  move = (gltf: THREE.Object3D) => {
    this.addZ(gltf, 0.01);
  };
}

export class MoveLeft extends Movement {
  addX(gltf: THREE.Object3D, x: number) {
    gltf.position.x += x;
  }

  move = (gltf: THREE.Object3D) => {
    this.addX(gltf, 0.01);
  };
}

export class MoveRight extends Movement {
  addX(gltf: THREE.Object3D, x: number) {
    gltf.position.x -= x;
  }

  move = (gltf: THREE.Object3D) => {
    this.addX(gltf, 0.01);
  };
}

export class MoveUp extends Movement {
  addY(gltf: THREE.Object3D, y: number) {
    gltf.position.y -= y;
  }

  move = (gltf: THREE.Object3D) => {
    this.addY(gltf, 0.01);
  };
}

export class MoveDown extends Movement {
  addY(gltf: THREE.Object3D, y: number) {
    gltf.position.y += y;
  }

  move = (gltf: THREE.Object3D) => {
    this.addY(gltf, 0.01);
  };
}

export class Stay extends Movement {
  move = () => {
    //Do nothing
  };
}

type MovementIndex = {
  [key: string]: Movement;
};

export const MovementList: MovementIndex = {
  spin_left: new SpinLeft(),
  spin_right: new SpinRight(),
  move_up: new MoveUp(),
  move_down: new MoveDown(),
  move_left: new MoveLeft(),
  move_right: new MoveRight(),
  move_front: new MoveFront(),
  move_back: new MoveBack(),
  stay: new Stay(),
};
