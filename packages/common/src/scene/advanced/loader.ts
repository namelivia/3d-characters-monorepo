//import Audio from '../audio/audio'
import { loadTransitions } from "../transitions/loader";
import { loadDialogs } from "../dialogs/loader";
import { loadCharacters, loadParts } from "../character/loader";
import { importResources } from "../resources/loader";
import { AdvancedSceneJSON } from "./json";
import { default as AdvancedScene } from "./advanced";
import { default as ResourceManager } from "../../resource_manager/resource_manager";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
/*import {
	AdvancedSceneJSON,
	ResourcesJSON,
	ResourceManager,
	AdvancedScene,
} from 'common'*/

/*const initializeAudio = async (
	resources: ResourceManager,
	audioResources: string[],
	audio: Audio,
	music: string
) => {
	await audio.addSongs(
		audioResources.map((key) => {
			return {
				key: key,
				data: resources.getSong(key),
			}
		})
	)
	audio.startSong(music)
	audio.setSong(music)
}*/

const loadScene2 = async (
  sceneJson: AdvancedSceneJSON
): Promise<AdvancedScene> => {
  const scene = new AdvancedScene();
  // From json resources, to resources
  //await loadResources(resources, sceneJson.resources)

  //from json audio to audio
  /*
	await initializeAudio(
		resources,
		sceneJson.resources.audio,
		audio,
		sceneJson.music
	)*/

  //from json characters to characters
  scene.setCharacters(loadCharacters(sceneJson.characters));
  scene.setTransitions(loadTransitions(sceneJson.transitions));
  scene.setDialogs(loadDialogs(sceneJson.dialogs));
  scene.setResources(importResources(sceneJson.resources));
  scene.setMusic(sceneJson.music);
  scene.setScenario(sceneJson.scene);
  return scene;
};

export const loadScene = async (url: string): Promise<AdvancedScene> => {
  const response = await fetch(url);
  const json = await response.json();
  return loadScene2(json);
};

export const loadResources = async (
  manager: ResourceManager,
  scene: AdvancedScene
) => {
  const resources = scene.resources;
  await manager.loadSongs(resources.audio);
  await manager.load({
    models3d: resources.models3d,
  });
};

export const assignResources = async (
  manager: ResourceManager,
  scene: AdvancedScene
) => {
  // Resources have been loaded and are available in the resource manager
  // Now objects in the scene need to be assigned with the resources
  // Let's start with the scenario for example, we need to assign the model property
  if (scene.scenario) {
    scene.scenario.model = manager.getModel3d(scene.scenario.key);
  }
  //It is the same for the music
  if (scene.music) {
    scene.music.audio = manager.getSong(scene.music.key);
  }
  //And should be same for each of the characters
  for (const character of scene.characters) {
    const gltf = manager.getModel3d(character.model3d);
    const gltfSceneClone = SkeletonUtils.clone(gltf.scene);
    character.setGLTF(gltfSceneClone);
    character.setAnimations(gltf.animations);
    const parts = await loadParts(character.configuration); // Fetch the parts from it's json file
    character.setParts(parts);
  }
};
