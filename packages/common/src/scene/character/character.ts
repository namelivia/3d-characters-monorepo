import * as THREE from "three";
import { Timesheet } from "./timesheet/timesheet";
import { Movement } from "./timesheet/movement";
import { Animation } from "./timesheet/animation";

// Base character class
class Character {
  gltf?: THREE.Object3D;
  posX: number = 0;
  posY: number = 0;
  posZ: number = 0;
  rotY: number = 0;
  model3d: string;
  configuration: string;

  constructor(model3d: string, configuration: string) {
      this.model3d = model3d
      this.configuration = configuration
  }

  setGLTF(gltf: THREE.Object3D) {
      this.gltf = gltf
      this.updateGLTF()
  }

  updateGLTF() {
    if (this.gltf) {
        this.gltf.position.x = this.posX;
        this.gltf.position.y = this.posY;
        this.gltf.position.z = this.posZ;
        this.gltf.rotation.y = this.rotY;
    }
  }

  addPosition(x: number, y: number, z: number) {
    this.posX = x;
    this.posY = y;
    this.posZ = z;
    this.updateGLTF()
  }

  addRotation(y: number) {
    this.rotY += y;
    this.updateGLTF()
  }

  changePartColor = (part: string, color: string): void => {
    if (this.gltf) { // Color parts can only be changed after setting the GLTF
        const partObject = this.gltf.getObjectByName(part);
        if (partObject) {
          const mesh = partObject as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          const newMaterial = material.clone();
          newMaterial.map = null;
          newMaterial.color = new THREE.Color(parseInt(color, 16));
          mesh.material = newMaterial;
        }
    }
  };

  getModelName = (): string => this.model3d

  getModel = (): THREE.Object3D | undefined => {
    return this.gltf;
  };
}

// Character with animations
class AnimatedCharacter extends Character {
  mixer?: THREE.AnimationMixer;
  animations?: Animation;
  currentAnimation?: THREE.AnimationAction;

  setAnimations(animations: THREE.AnimationClip[]) {
    if (this.gltf) { // Animations can only be set after setting the GLTF
        this.animations = new Animation(animations);
        this.mixer = new THREE.AnimationMixer(this.gltf);
        this.currentAnimation = this.animations.set(
          "idle",
          this.mixer,
          this.currentAnimation
        );
    }
  }
}

type Part = {
  part: string;
  color: string | null;
};

class ScenarioCharacter extends AnimatedCharacter {
  movement?: Movement;
  timesheet?: Timesheet;

  setParts(parts: Part[]) {
    this.applyColors(parts);
    this.cleanupGLTF(parts.map((part) => part.part));
  }
  
  cleanupGLTF(parts: string[]) {
    if (this.gltf) { //Only to do when the gltf has been loaded
        //Remove all meshes that are not bones or parts of the character
        const armature = this.gltf.children[0];
        armature.children = armature.children.filter((child) => {
          return child.type === "Bone" || parts.includes(child.name);
        });
    }
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
    //Only to do when animations have been loaded
    if (this.timesheet && this.animations && this.mixer) {
      const animation = this.timesheet.getAnimation(time);
      this.currentAnimation = this.animations.set(
        animation,
        this.mixer,
        this.currentAnimation
      );
    }
  }

  updateMovement(time: number) {
    //Only to do when gltf has been loaded
    //This can probably be CHANGED
    if (this.timesheet && this.gltf) {
      const movement = this.timesheet.getMovement(time);
      movement.move(this.gltf);
    }
  }
}

export { Character, AnimatedCharacter, ScenarioCharacter };
