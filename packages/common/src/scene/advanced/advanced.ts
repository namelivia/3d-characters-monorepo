import { Character, AnimatedCharacter } from "../character/character";
import Dialog from "../dialogs/dialog";
import Transition from "../transitions/transition";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type SceneResources = {
  audio: string[];
  models3d: string[];
};

class Scenario {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  setModel = (model: GLTF): LoadedScenario => {
    return new LoadedScenario(this.key, model);
  };
}

class LoadedScenario extends Scenario {
  model: GLTF;
  constructor(key: string, model: GLTF) {
    super(key);
    this.model = model;
  }
}

class Music {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  setAudio = (audio: AudioBuffer): LoadedMusic => {
    return new LoadedMusic(this.key, audio);
  };
}

class LoadedMusic extends Music {
  audio: AudioBuffer;
  constructor(key: string, audio: AudioBuffer) {
    super(key);
    this.audio = audio;
  }
}

class AdvancedScene {
  characters: Character[];
  dialogs: Dialog[];
  transitions: Transition[];
  scenario: Scenario | undefined;
  music: Music | undefined;
  resources: SceneResources;
  constructor() {
    this.characters = [];
    this.dialogs = [];
    this.transitions = [];
    this.scenario = undefined;
    this.music = undefined;
    this.resources = {
      audio: [],
      models3d: [],
    };
  }

  setCharacters = (characters: Character[]) => {
    this.characters = characters;
  };

  setResources = (resources: SceneResources) => {
    this.resources = resources;
  };

  setMusic = (key: string) => {
    this.music = new Music(key);
  };

  setScenario = (key: string) => {
    this.scenario = new Scenario(key);
  };

  setDialogs = (dialogs: Dialog[]) => {
    this.dialogs = dialogs;
  };

  setTransitions = (transitions: Transition[]) => {
    this.transitions = transitions;
  };

  getCharacters = (): Character[] => {
    return this.characters;
  };
}

class LoadedAdvancedScene extends AdvancedScene {
  scenario: LoadedScenario;
  music: LoadedMusic;
  characters: AnimatedCharacter[];

  constructor(
    scenario: LoadedScenario,
    music: LoadedMusic,
    characters: AnimatedCharacter[]
  ) {
    super();
    this.scenario = scenario;
    this.music = music;
    this.characters = characters;
  }
}

export { AdvancedScene, LoadedAdvancedScene };
