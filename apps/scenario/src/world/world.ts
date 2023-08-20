import { ScenarioCharacter } from '../characters/character'
import Scene from '../scene/scene'
import { World as World3D } from 'common'

class World {
	characters?: [ScenarioCharacter?]
	time: number = 0
	world3D: World3D

	constructor() {
		this.world3D = new World3D()
	}

	initialize = () => {
		this.characters = []
		this.time = 0
		this.world3D.initialize()
	}

	step = () => {
		this.time = this.time + 1
		this.characters?.forEach((character) => {
			character?.update(this.time)
		})
		this.world3D.step()
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters?.push(character)
		this.world3D.add(character)
	}

	loadScene = (scene: Scene) => {
		this.initialize()
		scene.characters.forEach((character) => {
			this.addCharacter(character)
		})
	}
}

export default World
