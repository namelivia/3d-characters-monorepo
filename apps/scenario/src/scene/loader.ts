import Scene from './scene'
import Transition from './transition'
import Dialog from '../dialogs/dialog'
import Audio from '../audio/audio'
import ResourceManager from '../resource_manager/resource_manager'
import { newCharacter } from '../characters/factory'
import {
	ScenePlayerJSON,
	DialogsJSON,
	ResourcesJSON,
	CharactersJSON,
} from 'common'

const loadResources = async (
	manager: ResourceManager,
	resources: ResourcesJSON
) => {
	await manager.loadSongs(resources.audio)
	await manager.load({
		models3d: resources.models3d,
	})
}

const initializeAudio = async (
	resources: ResourceManager,
	audioResources: string[],
	audio: Audio,
	music: string
) => {
	await audio.addSongs(
		audioResources.map((key) => {
			return {
				key: key,
				data: resources.getSong(key),
			}
		})
	)
	audio.startSong(music)
	audio.setSong(music)
}

const initializeCharacters = async (
	scene: Scene,
	resources: ResourceManager,
	characters: CharactersJSON
) => {
	for await (const character of characters) {
		const new_character = await newCharacter(
			resources.getModel3d(character.model3d),
			character.model,
			character.movement,
			character.animation,
			character.position[0],
			character.position[1],
			character.position[2]
		)
		scene.addCharacter(new_character)
	}
}

const initializeDialogs = async (scene: Scene, dialogs: DialogsJSON) => {
	for await (const dialog of dialogs) {
		scene.addDialog(
			new Dialog(dialog.id, dialog.text, dialog.start, dialog.duration)
		)
	}
}

const initializeScene = async (
	resources: ResourceManager,
	audio: Audio,
	sceneJson: ScenePlayerJSON
): Promise<Scene> => {
	const scene = new Scene()
	await loadResources(resources, sceneJson.resources)
	await initializeAudio(
		resources,
		sceneJson.resources.audio,
		audio,
		sceneJson.music
	)
	await initializeCharacters(scene, resources, sceneJson.characters)
	for await (const transition of sceneJson.transitions) {
		scene.addTransition(new Transition(transition.scene, transition.time))
	}
	await initializeDialogs(scene, sceneJson.dialogs)
	scene.setScenario(resources.getModel3d(sceneJson.scene))
	return scene
}

export const loadScene = async (
	resources: ResourceManager,
	audio: Audio,
	key: string
): Promise<Scene> => {
	const response = await fetch(`./scenes/${key}.json`)
	const json = await response.json()
	return initializeScene(resources, audio, json)
}
