import SceneSelector from './selector/scene_selector'
import MusicSelector from './selector/music_selector'
import CharacterSelector from './selector/character_selector'
import JsonPreview from './json_preview/json_preview'
import ResourceList, { ResourceCatalog } from './resource_list/resource_list'
import Actions from './actions/actions'
import Name from './name/name'
import Transition from './keyframes/transition'
import Dialog from './keyframes/dialog'
import { BasicWorld, SceneEditorJSON, Scene, ResourceManager } from 'common'

const saveSelectedObjects = (sceneName: string, sceneJson: SceneEditorJSON) => {
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
} as SceneEditorJSON

const previewScene = async (scene: SceneEditorJSON, world: BasicWorld) => {
	// Initialize scene
	const resources = scene.resources
	const manager = new ResourceManager()
	await manager.loadSongs(resources.audio)
	await manager.load({
		models3d: resources.models3d,
	})
	const newScene = new Scene()
	if (scene.scene) {
		newScene.setScenario(manager.getModel3d(scene.scene))
	}

	//Apply scene to world
	world.loadScene(scene)
}

const main = async () => {
	const currentScene = emptyScene
	let sceneName = ''

	const resourceList = new ResourceList()
	const resources = (await resourceList.initialize()) as ResourceCatalog

	// Initialize the UI
	const name = new Name()
	name.initialize()
	const sceneSelector = new SceneSelector()
	const musicSelector = new MusicSelector()
	musicSelector.display(resources.music)
	const characterSelector = new CharacterSelector()
	sceneSelector.display(resources.models)
	characterSelector.display(resources.characters)

	const transition = new Transition()
	transition.initialize()

	const dialog = new Dialog()
	dialog.initialize()

	const jsonPreview = new JsonPreview()
	jsonPreview.display(currentScene)

	const actions = new Actions()
	actions.display()

	// Initialize world
	const world = new BasicWorld()
	world.initialize()
	world.addFloorGrid()

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
				movement: { index: {}, length: 0 }, //TODO
				animation: { index: {}, length: 0 }, //TODO
				position: [0, 0, 0], //TODO
			})
			jsonPreview.display(currentScene)
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
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(sceneName, currentScene)
			}
			if (detail.action === 'Preview') {
				previewScene(currentScene, world)
			}
		},
		true
	)
}

main()
