import SceneSelector from './selector/scene_selector'
import MusicSelector from './selector/music_selector'
import CharacterSelector from './selector/character_selector'
import CharacterList from './selector/character_list'
import SelectedCharacter from './selector/selected_character'
import JsonPreview from './json_preview/json_preview'
import ResourceList, { ResourceCatalog } from './resource_list/resource_list'
import Actions from './actions/actions'
import Name from './name/name'
//import Transition from './keyframes/transition'
//import Dialog from './keyframes/dialog'
import {
	AdvancedWorld,
	loadAdvancedSceneJSON,
	loadAdvancedSceneResources,
	assignAdvancedSceneResources,
	AdvancedSceneJSON,
	ResourceManager,
} from 'common'

const setScene = async (
	resources: ResourceManager,
	world: AdvancedWorld,
	sceneJson: AdvancedSceneJSON
) => {
	const scene = await loadAdvancedSceneJSON(sceneJson) // Load the scene form the json
	await loadAdvancedSceneResources(resources, scene) // Request the resources associated to the scene
	const loadedScene = await assignAdvancedSceneResources(resources, scene) // Assign them (this could be together)
	if (loadedScene) {
		world.loadScene(loadedScene)
	}
}

const saveSelectedObjects = (
	sceneName: string,
	sceneJson: AdvancedSceneJSON
) => {
	const bb = new Blob([JSON.stringify(sceneJson)], { type: 'text/plain' })
	const a = document.createElement('a')
	a.download = `${sceneName}.json`
	a.href = window.URL.createObjectURL(bb)
	a.click()
}

const emptyScene = {
	resources: {
		models3d: [],
		audio: [],
	},
	dialogs: [],
	transitions: [],
	characters: [],
} as AdvancedSceneJSON

const previewScene = async (
	scene: AdvancedSceneJSON,
	world: AdvancedWorld,
	resources: ResourceManager
) => {
	// Play a sample scene
	await setScene(resources, world, scene)
}

const main = async () => {
	const currentScene = emptyScene
	let sceneName = ''

	const resourceList = new ResourceList()
	const allResources = (await resourceList.initialize()) as ResourceCatalog

	// Initialize the UI
	const name = new Name()
	name.initialize()
	const sceneSelector = new SceneSelector()
	const musicSelector = new MusicSelector()
	musicSelector.display(allResources.music)
	const characterSelector = new CharacterSelector()
	sceneSelector.display(allResources.models)
	characterSelector.display(allResources.characters)
	const characterList = new CharacterList()
	const selectedCharacter = new SelectedCharacter()

	/*
	const transition = new Transition()
	transition.initialize()

	const dialog = new Dialog()
	dialog.initialize()
    */

	const jsonPreview = new JsonPreview()
	jsonPreview.display(currentScene)

	const actions = new Actions()
	actions.display()

	// Initialize world
	const resources = new ResourceManager()
	const world = new AdvancedWorld('3d-view')

	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})

	document.addEventListener(
		'sceneSelectorChange',
		function (event) {
			const scene = (<CustomEvent>event).detail
			currentScene['scene'] = scene
			currentScene['resources']['models3d'].push(scene)
			jsonPreview.display(currentScene)
		},
		true
	)

	document.addEventListener(
		'musicSelectorChange',
		function (event) {
			const music = (<CustomEvent>event).detail
			currentScene['music'] = music
			currentScene['resources']['audio'].push(music)
			jsonPreview.display(currentScene)
		},
		true
	)

	document.addEventListener(
		'nameChange',
		function (event) {
			const name = (<CustomEvent>event).detail
			sceneName = name
		},
		true
	)

	document.addEventListener(
		'dialogAdd',
		function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.dialogs.push({
				id: Math.random().toString(36).substring(7), //random id
				text: detail.text,
				start: Number(detail.keyframe),
				duration: Number(detail.duration),
			})
			jsonPreview.display(currentScene)
		},
		true
	)

	document.addEventListener(
		'characterAdd',
		function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.characters.push({
				model3d: 'models/test.gltf', //TODO
				model: detail.character,
				movement: { index: {}, duration: 0 }, //TODO
				animation: { index: {}, duration: 0 }, //TODO
				position: [detail.x, 0, detail.z],
				rotation: detail.rotation,
			})
			jsonPreview.display(currentScene)
			characterList.display(currentScene.characters)
		},
		true
	)

	document.addEventListener(
		'characterRemove',
		function (event) {
			const detail = (<CustomEvent>event).detail
			const characterIndex = detail.index
			currentScene.characters.splice(characterIndex, 1)
			jsonPreview.display(currentScene)
			characterList.display(currentScene.characters)
		},
		true
	)

	document.addEventListener(
		'characterSelected',
		function (event) {
			const detail = (<CustomEvent>event).detail
            const character = currentScene.characters[detail.index]
            selectedCharacter.display(character)
            const lightGreen = '00FF00'
            if (world && world.characters) {
                const worldCharacter = world.characters[detail.index]
                if (worldCharacter) {
                    worldCharacter.applyColorOverlay(lightGreen)
                }
            }
		},
		true
	)

	document.addEventListener(
		'transitionAdd',
		function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.transitions.push({
				scene: detail.scene,
				time: Number(detail.time),
			})
			jsonPreview.display(currentScene)
		},
		true
	)

	document.addEventListener(
		'buttonClick',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(sceneName, currentScene)
			}
			if (detail.action === 'Preview') {
				await previewScene(currentScene, world, resources)
			}
		},
		true
	)
}

main()
