//import Audio from '../audio/audio'
import { loadTransitions } from "../transitions/loader";
import { loadDialogs } from "../dialogs/loader";
import { loadCharacters, loadParts } from "../character/loader";
import { Character, AnimatedCharacter } from "../character/character";
import { importResources } from "../resources/loader";
import { AdvancedSceneJSON } from "./json";
import { AdvancedScene, LoadedAdvancedScene } from "./advanced";
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

export const loadSceneJSON = async (
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

export const loadRemoteScene = async (url: string): Promise<AdvancedScene> => {
  const response = await fetch(url);
  const json = await response.json();
  return loadSceneJSON(json);
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

const loadAnimatedCharacter = async (
  character: Character,
  manager: ResourceManager
): Promise<AnimatedCharacter> => {
  const gltf = manager.getModel3d(character.model3d);
  const gltfSceneClone = SkeletonUtils.clone(gltf.scene);
  const loadedCharacter = character.setGLTF(gltfSceneClone);
  const animatedCharacter = loadedCharacter.setAnimations(gltf.animations);
  // How do I transform animated character into a scenario character?
  const parts = await loadParts(character.configuration); // Fetch the parts from it's json file
  animatedCharacter.setParts(parts);
  return animatedCharacter;
};

export const assignResources = async (
  manager: ResourceManager,
  scene: AdvancedScene
): Promise<LoadedAdvancedScene | undefined> => {
  // Resources have been loaded and are available in the resource manager
  // Now objects in the scene need to be assigned with the resources.
  if (scene.scenario) {
    //TODO: This assumes scenario and music will always exist
    if (scene.music) {
      //And should be same for each of the characters
      const scenarioCharacters = [] as AnimatedCharacter[];
      for (const character of scene.characters) {
        scenarioCharacters.push(
          await loadAnimatedCharacter(character, manager)
        );
      }

      const loadedScene = new LoadedAdvancedScene(
        scene.scenario.setModel(manager.getModel3d(scene.scenario.key)),
        scene.music.setAudio(manager.getSong(scene.music.key)),
        scenarioCharacters
      );

      return loadedScene;
    }
  }
};
