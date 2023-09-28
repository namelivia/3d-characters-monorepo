import * as THREE from "three";
import { Timesheet } from "./timesheet/timesheet";
import { Movement } from "./timesheet/movement";
import { Animation } from "./timesheet/animation";

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

  getModel = (): THREE.Object3D => {
    return this.gltf;
  };
}

// Character with animations
class AnimatedCharacter extends Character {
  mixer: THREE.AnimationMixer;
  animations: Animation;
  currentAnimation?: THREE.AnimationAction;

  constructor(gltf: THREE.Object3D, animations: THREE.AnimationClip[]) {
    super(gltf);
    this.animations = new Animation(animations);
    this.mixer = new THREE.AnimationMixer(gltf);
    this.currentAnimation = this.animations.set(
      "idle",
      this.mixer,
      this.currentAnimation
    );
  }
}

type Part = {
  part: string;
  color: string | null;
};

class ScenarioCharacter extends AnimatedCharacter {
  gltf: THREE.Object3D;
  movement?: Movement;
  timesheet?: Timesheet;

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

  constructor(
    gltf: THREE.Object3D,
    animations: THREE.AnimationClip[],
    parts: Part[]
  ) {
    super(gltf, animations);
    this.gltf = gltf;
    this.applyColors(parts);
    this.cleanupGLTF(parts.map((part) => part.part));
  }

  setTimesheet(timesheet: Timesheet) {
    this.timesheet = timesheet;
  }

  update(time: number) {
    this.updateMovement(time);
    this.updateAnimation(time);
  }

  updateAnimation(time: number) {
    if (this.timesheet) {
      const animation = this.timesheet.getAnimation(time);
      this.currentAnimation = this.animations.set(
        animation,
        this.mixer,
        this.currentAnimation
      );
    }
  }

  updateMovement(time: number) {
    if (this.timesheet) {
      const movement = this.timesheet.getMovement(time);
      movement.move(this.gltf);
    }
  }
}

export { Character, AnimatedCharacter, ScenarioCharacter };
