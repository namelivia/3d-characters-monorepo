import Scene from './scene'
import { newCharacter } from '../characters/factory'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type SceneJson = {
	characters: {
		model: string
		movement: string
		position: [number, number, number]
	}[]
}

const processScene = async (
	gltf: GLTF,
	sceneJson: SceneJson
): Promise<Scene> => {
	const scene = new Scene()
	for await (const character of sceneJson.characters) {
		const new_character = await newCharacter(
			gltf,
			character.model,
			character.movement,
			character.position[0],
			character.position[1],
			character.position[2]
		)
		scene.addCharacter(new_character)
	}
	return scene
}

export const loadScene = async (gltf: GLTF, key: string): Promise<Scene> => {
	const response = await fetch(`./scenes/${key}.json`)
	const json = await response.json()
	return processScene(gltf, json)
}
