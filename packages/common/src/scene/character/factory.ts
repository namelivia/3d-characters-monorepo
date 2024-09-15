import { loadParts } from "./loader";
//import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { Timesheet, ActionMap } from "./timesheet/timesheet";
import { AnimatedCharacter, Character } from "./character";

export const initializeCharacter = async (character: AnimatedCharacter) => {
  //Set the GLTF
  // For each character we need to copy the gltf scene
  /*const gltfSceneClone = SkeletonUtils.clone(gltf.scene)
    character.setGLTF(gltfSceneClone)
    character.setAnimations(gltf.animations)*/

  // Set the parts
  const parts = await loadParts(character.configuration); // Fetch the parts from it's json file
  character.setParts(parts);
};

export const newCharacter = (
  model3d: string,
  configuration: string,
  movement: ActionMap,
  animation: ActionMap,
  x: number,
  y: number,
  z: number,
  rotation: number
): Character => {
  const character = new Character(model3d, configuration);

  // Set the position
  character.addPosition(x, y, z);

  // Set the rotation
  character.addRotation(rotation);

  // Set the timesheet
  const timesheet = new Timesheet();
  timesheet.setMovementMap(movement);
  timesheet.setAnimationMap(animation);
  character.setTimesheet(timesheet);
  return character;
};
