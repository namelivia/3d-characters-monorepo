import * as THREE from "three";
import { Timesheet } from "./timesheet/timesheet";
import { Movement } from "./timesheet/movement";
import { Animation } from "./timesheet/animation";

// Base character class
class Character {
  posX: number = 0;
  posY: number = 0;
  posZ: number = 0;
  rotY: number = 0;
  model3d: string;
  configuration: string;

  constructor(model3d: string, configuration: string) {
    this.model3d = model3d;
    this.configuration = configuration;
  }

  setGLTF(gltf: THREE.Object3D): LoadedCharacter {
    return new LoadedCharacter(this.model3d, this.configuration, gltf);
  }

  addPosition(x: number, y: number, z: number): void {
    this.posX = x;
    this.posY = y;
    this.posZ = z;
  }

  addRotation(y: number): void {
    this.rotY += y;
  }

  getModelName = (): string => this.model3d;
}

// Character with GLTF loaded
class LoadedCharacter extends Character {
  gltf: THREE.Object3D;
  constructor(model3d: string, configuration: string, gltf: THREE.Object3D) {
    super(model3d, configuration);
    this.gltf = gltf;
    this.updateGLTF();
  }

  addPosition(x: number, y: number, z: number): void {
    super.addPosition(x, y, z);
    this.updateGLTF();
  }

  addRotation(y: number): void {
    super.addRotation(y);
    this.updateGLTF();
  }

  getModel = (): THREE.Object3D => {
    return this.gltf;
  };

  getVisibleParts = (): string[] => {
    const visibleParts: string[] = [];
    this.gltf.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.SkinnedMesh) {
        if (object.visible) {
          visibleParts.push(object.name);
        }
      }
    });
    return visibleParts;
  };

  togglePartVisibility = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = !partObject.visible;
    }
  };

  updateGLTF(): void {
    this.gltf.position.x = this.posX;
    this.gltf.position.y = this.posY;
    this.gltf.position.z = this.posZ;
    this.gltf.rotation.y = this.rotY;
  }

  hidePart = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = false;
    }
  };

  hideAllParts = (): void => {
    this.gltf.traverse((object: THREE.Object3D) => {
      // Did this ever work?
      //if (object instanceof THREE.SkinnedMesh) {
      if (object.type === "SkinnedMesh") {
        object.visible = false;
      }
    });
  };

  showPart = (part: string): void => {
    const partObject = this.gltf.getObjectByName(part);
    if (partObject) {
      partObject.visible = true;
    }
  };

  changePartColor = (part: string, color: string): void => {
    // Color parts can only be changed after setting the GLTF
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

  setAnimations(gltfAnimations: THREE.AnimationClip[]): AnimatedCharacter {
    const animations = new Animation(gltfAnimations);
    const mixer = new THREE.AnimationMixer(this.gltf);
    return new AnimatedCharacter(
        this.model3d,
        this.configuration,
        this.gltf,
        animations,
        mixer
    );
  }
}

// Character with animations
class AnimatedCharacter extends LoadedCharacter {
  mixer: THREE.AnimationMixer;
  animations: Animation;
  currentAnimation: THREE.AnimationAction | undefined;

  constructor(
    model3d: string,
    configuration: string,
    gltf: THREE.Object3D,
    animations: Animation,
    mixer: THREE.AnimationMixer
  ) {
    super(model3d, configuration, gltf);
    this.animations = animations;
    this.mixer = mixer;
    this.currentAnimation = animations.set(
      "idle", //Start with idle animation as a default
      mixer,
      undefined
    );
  }

  addBehavior(movement: Movement, timesheet: Timesheet): ScenarioCharacter {
    return new ScenarioCharacter(
      this.model3d,
      this.configuration,
      this.gltf,
      this.animations,
      this.mixer,
      movement,
      timesheet
    );
  }
}

type Part = {
  part: string;
  color: string | null;
};

class ScenarioCharacter extends AnimatedCharacter {
  movement: Movement;
  timesheet: Timesheet;

  constructor(
    model3d: string,
    configuration: string,
    gltf: THREE.Object3D,
    animations: Animation,
    mixer: THREE.AnimationMixer,
    movement: Movement,
    timesheet: Timesheet
  ) {
    super(model3d, configuration, gltf, animations, mixer);
    this.movement = movement;
    this.timesheet = timesheet;
  }


  setParts(parts: Part[]) {
    this.applyColors(parts);
    this.cleanupGLTF(parts.map((part) => part.part));
  }

  cleanupGLTF(parts: string[]) {
    //Remove all meshes that are not bones or parts of the character
    const armature = this.gltf.children[0];
    armature.children = armature.children.filter((child) => {
      return child.type === "Bone" || parts.includes(child.name);
    });
  }

  applyColors(parts: Part[]) {
    parts.forEach((part) => {
      if (part.color) {
        this.changePartColor(part.part, part.color);
      }
    });
  }

  setTimesheet(timesheet: Timesheet) {
    this.timesheet = timesheet;
  }

  update(time: number) {
    this.updateMovement(time);
    this.updateAnimation(time);
  }

  updateAnimation(time: number) {
      const animation = this.timesheet.getAnimation(time);
      this.currentAnimation = this.animations.set(
        animation,
        this.mixer,
        this.currentAnimation
      );
  }

  updateMovement(time: number) {
    const movement = this.timesheet.getMovement(time);
    movement.move(this.gltf);
  }
}

export { Character, LoadedCharacter, AnimatedCharacter, ScenarioCharacter };
