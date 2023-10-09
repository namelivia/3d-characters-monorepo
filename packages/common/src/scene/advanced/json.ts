import { DialogsJSON } from "../dialogs/loader";
import { TransitionsJSON } from "../transitions/loader";
import { CharactersJSON } from "../character/loader";
import { ResourcesJSON } from "../../resource_manager/loader";

export type AdvancedSceneJSON = {
  resources: ResourcesJSON;
  music: string;
  scene: string;
  characters: CharactersJSON;
  dialogs: DialogsJSON;
  transitions: TransitionsJSON;
};
