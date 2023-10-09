import { ScenarioCharacter } from "../character/character";
import Dialog from "../dialogs/dialog";
import Transition from "../transitions/transition";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type SceneResources = {
    audio: string[]
    models3d: string[]
}

type Scenario = {
    model: GLTF | null
    key: string
}

type Music = {
    audio: AudioBuffer | null
    key: string
}

class AdvancedScene {
  characters: ScenarioCharacter[];
  dialogs: Dialog[];
  transitions: Transition[];
  scenario: Scenario | undefined;
  music: Music | undefined;
  resources: SceneResources
  constructor() {
    this.characters = [];
    this.dialogs = [];
    this.transitions = [];
    this.scenario = undefined;
    this.music = undefined;
    this.resources = {
        audio: [],
        models3d: []
    }
  }

  setCharacters = (characters: ScenarioCharacter[]) => {
    this.characters = characters
  };

  setResources = (resources: SceneResources) => {
    this.resources = resources
  }

  setMusic = (key: string) => {
      this.music = {
        audio: null,
        key: key
      }
  }

  setScenario = (key: string) => {
      this.scenario = {
        model: null,
        key: key
      }
  }

  setDialogs = (dialogs: Dialog[]) => {
    this.dialogs = dialogs
  };

  setTransitions = (transitions: Transition[]) => {
    this.transitions = transitions
  };

  getCharacters = (): ScenarioCharacter[] => {
    return this.characters;
  };
}
export default AdvancedScene;
