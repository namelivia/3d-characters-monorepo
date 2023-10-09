import { ActionMapJSON } from "./timesheet/loader";
import { ScenarioCharacter } from "./character";
import { newCharacter } from "./factory";

export type CharactersJSON = {
  model3d: string;
  model: string;
  movement: ActionMapJSON;
  animation: ActionMapJSON;
  position: [number, number, number];
}[];

export const loadCharacters = (json: CharactersJSON): ScenarioCharacter[] => {
    return json.map((character) => newCharacter(
            character.model3d,
            character.model,
            character.movement,
            character.animation,
            character.position[0],
            character.position[1],
            character.position[2]
        )
    )
}

//Loads the part of a character from a json file
export const loadParts = async (key: string) => {
	const response = await fetch(`./characters/${key}.json`)
	return await response.json()
}
