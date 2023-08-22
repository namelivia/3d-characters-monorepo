import { ScenarioCharacter } from '../characters/character'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Dialog from '../dialogs/dialog'
import View2D from '../view_2d/view_2d'
import Scene from '../scene/scene'
import { World as World3D } from 'common'

class World {
	characters?: [ScenarioCharacter?]
	dialogs?: [Dialog?]
	time: number = 0
	world3D: World3D
	view2D: View2D

	constructor() {
		this.world3D = new World3D()
		this.view2D = new View2D()
	}

	initialize = () => {
		this.characters = []
		this.dialogs = []
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
	}
}

export default World
