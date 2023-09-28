import { ActionMap } from "../character/timesheet/timesheet";

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

export type CharactersJSON = {
  model3d: string;
  model: string;
  movement: ActionMap;
  animation: ActionMap;
  position: [number, number, number];
}[];

export type SceneEditorJSON = {
  resources: ResourcesJSON;
  scene?: string;
  music?: string;
  characters: CharactersJSON;
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
