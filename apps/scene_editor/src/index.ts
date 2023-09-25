import SceneSelector from './selector/scene_selector'
import MusicSelector from './selector/music_selector'
import JsonPreview from './json_preview/json_preview'
import ResourceList, { ResourceCatalog } from './resource_list/resource_list'
import Actions from './actions/actions'
import Name from './name/name'
import Transition from './keyframes/transition'
import Dialog from './keyframes/dialog'
import { World, SceneEditorJSON } from 'common'

const saveSelectedObjects = (sceneName: string, sceneJson: SceneEditorJSON) => {
	const bb = new Blob([JSON.stringify(sceneJson)], { type: 'text/plain' })
	const a = document.createElement('a')
	a.download = `${sceneName}.json`
	a.href = window.URL.createObjectURL(bb)
	a.click()
}

const main = async () => {
	const sceneJson = {
		resources: {
			models3d: [],
			audio: [],
		},
		dialogs: [],
		transitions: [],
	} as SceneEditorJSON
	let sceneName = ''

	// Initialize the UI
	const name = new Name()
	name.initialize()
	const sceneSelector = new SceneSelector()
	const resourceList = new ResourceList()
	const resources = (await resourceList.initialize()) as ResourceCatalog
	sceneSelector.display(resources.models)

	const musicSelector = new MusicSelector()
	musicSelector.display(resources.music)

	const transition = new Transition()
	transition.initialize()

	const dialog = new Dialog()
	dialog.initialize()

	const jsonPreview = new JsonPreview()
	jsonPreview.display(JSON.stringify(sceneJson, null, 2))

	const actions = new Actions()
	actions.display()

	// Initialize world and character
	const world = new World()
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
			sceneJson['scene'] = scene
			sceneJson['resources']['models3d'].push(scene)
			jsonPreview.display(JSON.stringify(sceneJson, null, 2))
		},
		true
	)

	document.addEventListener(
		'musicSelectorChange',
		function (event) {
			const music = (<CustomEvent>event).detail
			sceneJson['music'] = music
			sceneJson['resources']['audio'].push(music)
			jsonPreview.display(JSON.stringify(sceneJson, null, 2))
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
			sceneJson.dialogs.push({
				id: Math.random().toString(36).substring(7), //random id
				text: detail.text,
				start: Number(detail.keyframe),
				duration: Number(detail.duration),
			})
			jsonPreview.display(JSON.stringify(sceneJson, null, 2))
		},
		true
	)

	document.addEventListener(
		'transitionAdd',
		function (event) {
			const detail = (<CustomEvent>event).detail
			sceneJson.transitions.push({
				scene: detail.scene,
				time: Number(detail.time),
			})
			jsonPreview.display(JSON.stringify(sceneJson, null, 2))
		},
		true
	)

	document.addEventListener(
		'myButtonClick',
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(sceneName, sceneJson)
			}
		},
		true
	)
}

main()
