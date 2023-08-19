import { ScenarioCharacter } from '../characters/character'
import Scene from '../scene/scene'
import { World as World3D } from 'common'

class World extends World3D {
	characters?: [ScenarioCharacter?]
	time: number = 0
	initialize = () => {
		super.initialize()
		this.characters = []
	}

	animate = () => {
		console.log('animate')
		this.time = this.time + 1
		this.characters?.forEach((character) => {
			character?.move(this.time)
		})
		super.animate()
	}

	addCharacter = (character: ScenarioCharacter) => {
		this.characters?.push(character)
		super.add(character)
	}

	loadScene = (scene: Scene) => {
		scene.characters.forEach((character) => {
			this.addCharacter(character)
		})
	}
}

export default World
