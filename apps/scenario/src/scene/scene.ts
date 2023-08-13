import Character from '../characters/character'

class Scene {
	characters: Character[]
	constructor() {
		this.characters = []
	}

	addCharacter = (character: Character) => {
		this.characters.push(character)
	}

	getCharacters = (): Character[] => {
		return this.characters
	}
}
export default Scene
