import * as THREE from "three";

// Base character class
class Character {
  gltf: THREE.Object3D;

  constructor(gltf: THREE.Object3D) {
    this.gltf = gltf;
  }

  addPosition(x: number, y: number, z: number) {
    this.gltf.position.x += x;
    this.gltf.position.y += y;
    this.gltf.position.z += z;
  }

  addRotation(y: number) {
    this.gltf.rotation.y += y;
  }

  getModel = (): THREE.Object3D => {
    return this.gltf;
  };
}

// Character with animations
class AnimatedCharacter extends Character {
  mixer: THREE.AnimationMixer;
  animations: THREE.AnimationClip[];
  currentAnimation?: THREE.AnimationAction;

  constructor(gltf: THREE.Object3D, animations: THREE.AnimationClip[]) {
    super(gltf);
    this.animations = animations;
    this.mixer = new THREE.AnimationMixer(gltf);
    this.setAnimation("idle");
  }

  setAnimation = (animationName: string): void => {
    const animation = this.animations.find(
      (animation) => animation.name === animationName
    );
    if (animation) {
      const newAnimation = this.mixer.clipAction(animation);
      if (this.currentAnimation === undefined) {
        this.currentAnimation = newAnimation;
      } else {
        if (this.currentAnimation !== newAnimation) {
          this.currentAnimation.stop();
          this.currentAnimation = newAnimation;
        }
      }
      this.currentAnimation.play();
    }
  };
}

// Character with animations and toggleable parts for the editor
class ToggleableCharacter extends AnimatedCharacter {
  constructor(gltf: THREE.Object3D, animations: THREE.AnimationClip[]) {
    super(gltf, animations);
    this.hideAllParts();
  }

  hideAllParts = (): void => {
    this.gltf.traverse((object) => {
      // Did this ever work?
      //if (object instanceof THREE.SkinnedMesh) {
      if (object.type === "SkinnedMesh") {
        object.visible = false;
      } else {
        console.debug("No need to hide:");
        console.debug(object);
      }
    });
  };

  showPart = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = true;
    }
  };

  hidePart = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = false;
    }
  };

  togglePartVisibility = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = !partObject.visible;
    }
  };

  changePartColor = (part: string, color: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      const mesh = partObject as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const newMaterial = material.clone();
      newMaterial.map = null;
      newMaterial.color = new THREE.Color(parseInt(color, 16));
      mesh.material = newMaterial;
    }
  };

  getVisibleParts = (): string[] => {
    const visibleParts: string[] = [];
    this.gltf.traverse((object) => {
      if (object instanceof THREE.SkinnedMesh) {
        if (object.visible) {
          visibleParts.push(object.name);
        }
      }
    });
    return visibleParts;
  };
}

export { Character, AnimatedCharacter, ToggleableCharacter };
