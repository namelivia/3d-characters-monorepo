import { ScenarioCharacter } from '../characters/character'
import Dialog from '../dialogs/dialog'

class Scene {
	characters: ScenarioCharacter[]
	dialogs: Dialog[]
	constructor() {
		this.characters = []
		this.dialogs = []
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters.push(character)
	}

	addDialog = (dialog: Dialog) => {
		this.dialogs.push(dialog)
	}

	getCharacters = (): ScenarioCharacter[] => {
		return this.characters
	}
}
export default Scene
