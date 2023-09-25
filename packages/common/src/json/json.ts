type TransitionsJSON = {
  scene: string;
  time: number;
}[];

export type DialogsJSON = {
  id: string;
  text: string;
  start: number;
  duration: number;
}[];

export type ResourcesJSON = {
  models3d: string[];
  audio: string[];
};

type MovementKeyframe = {
  [key: number]: string;
};

type AnimationKeyframe = {
  [key: number]: string;
};

export type MovementMap = {
  index: MovementKeyframe;
  length: number;
};

export type AnimationMap = {
  index: AnimationKeyframe;
  length: number;
};

export type CharactersJSON = {
  model3d: string;
  model: string;
  movement: MovementMap;
  animation: AnimationMap;
  position: [number, number, number];
}[];

export type SceneEditorJSON = {
  resources: ResourcesJSON;
  scene?: string;
  music?: string;
  dialogs: DialogsJSON;
  transitions: TransitionsJSON;
};

export type ScenePlayerJSON = {
  resources: ResourcesJSON;
  music: string;
  scene: string;
  characters: CharactersJSON;
  dialogs: DialogsJSON;
  transitions: TransitionsJSON;
};
