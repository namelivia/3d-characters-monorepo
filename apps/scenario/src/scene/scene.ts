import { ScenarioCharacter } from '../characters/character'
import Dialog from '../dialogs/dialog'
import Transition from './transition'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

class Scene {
	characters: ScenarioCharacter[]
	dialogs: Dialog[]
	transitions: Transition[]
	scenario: GLTF | null
	constructor() {
		this.characters = []
		this.dialogs = []
		this.transitions = []
		this.scenario = null
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters.push(character)
	}

	addDialog = (dialog: Dialog) => {
		this.dialogs.push(dialog)
	}

	addTransition = (transition: Transition) => {
		this.transitions.push(transition)
	}

	setScenario = (scenario: GLTF) => {
		this.scenario = scenario
	}

	getCharacters = (): ScenarioCharacter[] => {
		return this.characters
	}
}
export default Scene
