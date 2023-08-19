import * as THREE from "three";

// Base static character
class Character {
  gltf: THREE.Object3D;

  constructor(gltf: THREE.Object3D) {
    this.gltf = gltf;
  }

  getModel = (): THREE.Object3D => {
    return this.gltf;
  };
}

// Character with animations
class AnimatedCharacter extends Character {
  mixer: THREE.AnimationMixer;
  animations: THREE.AnimationClip[];

  constructor(gltf: THREE.Object3D, animations: THREE.AnimationClip[]) {
    super(gltf);
    this.animations = animations;
    this.mixer = new THREE.AnimationMixer(gltf);
    this.setAnimation("Idle");
  }

  playAnimation = (animation: THREE.AnimationClip): void => {
    const action = this.mixer.clipAction(animation);
    action.play();
  };

  setAnimation = (animationName: string): void => {
    const animation = this.animations.find(
      (animation) => animation.name === animationName
    );
    if (animation) {
      this.playAnimation(animation);
    }
  };
}

// Character with animations and toggleable parts
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
