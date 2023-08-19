import { ScenarioCharacter } from '../characters/character'

class Scene {
	characters: ScenarioCharacter[]
	constructor() {
		this.characters = []
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters.push(character)
	}

	getCharacters = (): ScenarioCharacter[] => {
		return this.characters
	}
}
export default Scene
