import { ScenarioCharacter } from '../characters/character'
import Scene from '../scene/scene'
import { World as World3D } from 'common'

class World {
	world3d: World3D
	characters?: [ScenarioCharacter?]
	time: number = 0
	constructor() {
		this.world3d = new World3D()
	}

	initialize = () => {
		this.world3d.initialize()
		this.characters = []
	}

	animate = () => {
		requestAnimationFrame(this.animate)
		this.time = this.time + 1
		this.characters?.forEach((character) => {
			character?.animate(this.time)
		})
		this.world3d.animate()
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters?.push(character)
		this.world3d.add(character)
	}

	loadScene = (scene: Scene) => {
		scene.characters.forEach((character) => {
			this.addCharacter(character)
		})
	}
}

export default World
