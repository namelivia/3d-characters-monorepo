import Scene from './scene'
import Transition from './transition'
import Dialog from '../dialogs/dialog'
import { newCharacter } from '../characters/factory'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

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
	gltf: GLTF,
	scenario: GLTF,
	sceneJson: SceneJson
): Promise<Scene> => {
	const scene = new Scene()
	for await (const character of sceneJson.characters) {
		const new_character = await newCharacter(
			gltf,
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
		scene.setScenario(scenario)
	}
	return scene
}

export const loadScene = async (
	gltf: GLTF,
	scenario: GLTF,
	key: string
): Promise<Scene> => {
	const response = await fetch(`./scenes/${key}.json`)
	const json = await response.json()
	return processScene(gltf, scenario, json)
}
