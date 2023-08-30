import Scene from './scene'
import Transition from './transition'
import Dialog from '../dialogs/dialog'
import ResourceManager from '../resource_manager/resource_manager'
import { newCharacter } from '../characters/factory'

type MovementKeyframe = {
	[key: number]: string
}

type AnimationKeyframe = {
	[key: number]: string
}

export type MovementMap = {
	index: MovementKeyframe
	length: number
}

export type AnimationMap = {
	index: AnimationKeyframe
	length: number
}

type SceneJson = {
	resources: {
		models3d: string[]
	}
	characters: {
		model: string
		movement: MovementMap
		animation: AnimationMap
		position: [number, number, number]
	}[]
	dialogs: {
		id: string
		text: string
		start: number
		duration: number
	}[]
	transitions: {
		scene: string
		time: number
	}[]
}

const processScene = async (
	resources: ResourceManager,
	sceneJson: SceneJson
): Promise<Scene> => {
	await resources.load({
		models3d: sceneJson.resources.models3d,
	})
	const scene = new Scene()
	for await (const character of sceneJson.characters) {
		const new_character = await newCharacter(
			resources.getModel3d('models/test.gltf'), //TODO: Maybe this should go in the json
			character.model,
			character.movement,
			character.animation,
			character.position[0],
			character.position[1],
			character.position[2]
		)
		scene.addCharacter(new_character)
	}
	for await (const transition of sceneJson.transitions) {
		scene.addTransition(new Transition(transition.scene, transition.time))
	}
	for await (const dialog of sceneJson.dialogs) {
		scene.addDialog(
			new Dialog(dialog.id, dialog.text, dialog.start, dialog.duration)
		)
		scene.setScenario(resources.getModel3d('models/scene.gltf'))
	}
	return scene
}

export const loadScene = async (
	resources: ResourceManager,
	key: string
): Promise<Scene> => {
	const response = await fetch(`./scenes/${key}.json`)
	const json = await response.json()
	return processScene(resources, json)
}
