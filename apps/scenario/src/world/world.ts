import { ScenarioCharacter } from '../characters/character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Dialog from '../dialogs/dialog'
import View2D from '../view_2d/view_2d'
import Scene from '../scene/scene'
import Transition from '../scene/transition'
import { BasicWorld } from 'common'

class World {
	characters?: [ScenarioCharacter?]
	dialogs?: [Dialog?]
	transitions?: [Transition?]
	time: number = 0
	world3D: BasicWorld
	view2D: View2D
	onSceneTransition: (scene: string) => Promise<void>

	constructor() {
		this.world3D = new BasicWorld()
		this.view2D = new View2D()
		this.onSceneTransition = () => Promise.resolve()
	}

	setOnSceneTransition = (
		onSceneTransition: (scene: string) => Promise<void>
	) => {
		this.onSceneTransition = onSceneTransition
	}

	initialize = () => {
		this.characters = []
		this.dialogs = []
		this.transitions = []
		this.time = 0
		this.world3D.initialize()
		this.view2D.addToDOM()
	}

	step = () => {
		this.time = this.time + 1
		this.characters?.forEach((character) => {
			character?.update(this.time)
		})
		this.dialogs?.forEach((dialog) => {
			dialog?.update(this.time)
		})
		this.transitions?.forEach((transition) => {
			transition?.update(this.time)
		})
		this.world3D.step()
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters?.push(character)
		this.world3D.add(character)
	}

	addScenario = (scenario: GLTF) => {
		this.world3D.addScenario(scenario)
	}

	addDialog = (dialog: Dialog) => {
		this.dialogs?.push(dialog)
	}

	addTransition = (transition: Transition) => {
		this.transitions?.push(transition)
	}

	loadScene = (scene: Scene) => {
		this.initialize()
		scene.characters.forEach((character) => {
			this.addCharacter(character)
		})
		if (scene.scenario) {
			this.addScenario(scene.scenario)
		}
		scene.dialogs.forEach((dialog) => {
			dialog.setView2D(this.view2D)
			this.addDialog(dialog)
		})
		scene.transitions.forEach((transition) => {
			transition.setOnSceneTransition(this.onSceneTransition)
			this.addTransition(transition)
		})
	}
}

export default World
