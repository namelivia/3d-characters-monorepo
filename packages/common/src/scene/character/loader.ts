import { ActionMapJSON } from "./timesheet/loader";
import { Character } from "./character";
import { newCharacter } from "./factory";

export type CharactersJSON = {
  model3d: string;
  model: string;
  movement: ActionMapJSON;
  animation: ActionMapJSON;
  position: [number, number, number];
}[];

export const loadCharacters = (json: CharactersJSON): Character[] => {
  return json.map((character) =>
    newCharacter(
      character.model3d,
      character.model,
      /*character.movement,
      character.animation,*/
      character.position[0],
      character.position[1],
      character.position[2]
    )
  );
};

//Loads the part of a character from a json file
export const loadParts = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};
