import './style.css'
import ResourceList, { ResourceCatalog } from './resource_list/resource_list'

import {
    // Scene properties
    Name,
    MusicSelector,
    SceneSelector,
    // Scene controls
    TimeDisplay,
    PlayPause,
    Timeline,
    // Character controls
    CharacterList,
    CharacterSelector,
    SelectedCharacter,
    // Dialog controls
    Dialog,
    DialogList,
    DialogEdit,
    // Results
    JsonPreview,
    Actions,
} from './ui'

//import Transition from './keyframes/transition'

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

// Functions to initialize the UI

const initializeSceneProperties = (allResources: any) => {
	const name = new Name()
	name.initialize()
	const musicSelector = new MusicSelector()
	musicSelector.display(allResources.music)
	const sceneSelector = new SceneSelector()
	sceneSelector.display(allResources.models)
}

const initializeSceneControls = (playing: boolean) => {
    const playPause = new PlayPause()
	playPause.display(playing)
    return {
        timeDisplay: new TimeDisplay(),
        playPause: playPause,
        timeline: new Timeline(),
    }
}

const initializeCharacterControls = (allResources: any) => {
	const characterSelector = new CharacterSelector()
	characterSelector.display(allResources.characters)
	const characterList = new CharacterList()
	const selectedCharacter = new SelectedCharacter()
    return {
        characterSelector: characterSelector,
        characterList: characterList,
        selectedCharacter: selectedCharacter,
    }
}

const initializeResults = (currentScene: any) => {
    const jsonPreview = new JsonPreview()
    jsonPreview.display(currentScene)
    const actions = new Actions()
    actions.display()
    return {
        jsonPreview: jsonPreview,
        actions: actions,
    }
}

const initializeDialogControls = () => {
    const dialog = new Dialog()
    dialog.initialize()
	const dialogList = new DialogList()
	const dialogEdit = new DialogEdit()
    return {
        dialog: dialog,
        dialogList: dialogList,
        dialogEdit: dialogEdit,
    }
}

const main = async () => {
	const currentScene = emptyScene
	let sceneName = ''
	let playing = false

	const resourceList = new ResourceList()
	const allResources = (await resourceList.initialize()) as ResourceCatalog

	// Initialize the UI
    initializeSceneProperties(allResources)
    const { timeDisplay, playPause, timeline } = initializeSceneControls(playing)
    const { characterSelector, characterList, selectedCharacter } = initializeCharacterControls(allResources)
    const { dialog, dialogList, dialogEdit } = initializeDialogControls()
    const { jsonPreview, actions } = initializeResults(currentScene)

	/*
	const transition = new Transition()
	transition.initialize()
    */

	// Initialize 3d world
	const resources = new ResourceManager()
	const world = new AdvancedWorld('viewport')

	requestAnimationFrame(function animate() {
		timeDisplay.display(world.time)
		timeline.display(world.time)
		if (playing) {
			world.step()
		}
		requestAnimationFrame(animate)
	})

	document.addEventListener(
		'sceneSelectorChange',
		async function (event) {
			const scene = (<CustomEvent>event).detail
			currentScene['scene'] = scene
			currentScene['resources']['models3d'].push(scene)
			jsonPreview.display(currentScene)
			await previewScene(currentScene, world, resources)
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
				start: parseInt(detail.keyframe),
				duration: parseInt(detail.duration),
			})
			jsonPreview.display(currentScene)
            dialogList.display(currentScene.dialogs)
		},
		true
	)

	document.addEventListener(
		'dialogUpdate',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.dialogs[detail.index].text = detail.text
			currentScene.dialogs[detail.index].start = parseInt(detail.start)
			currentScene.dialogs[detail.index].duration = parseInt(detail.duration)
			jsonPreview.display(currentScene)
			await previewScene(currentScene, world, resources)
		},
		true
	)

	document.addEventListener(
		'dialogRemove',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			const dialogIndex = detail.index
			currentScene.dialogs.splice(dialogIndex, 1)
			dialogList.display(currentScene.dialogs)
			jsonPreview.display(currentScene)
			dialogEdit.clear()
			await previewScene(currentScene, world, resources)
		},
		true
	)

	document.addEventListener(
		'dialogSelected',
		function (event) {
			const detail = (<CustomEvent>event).detail
			const dialog = currentScene.dialogs[detail.index]
			dialogEdit.display(parseInt(detail.index), dialog)
		},
		true
	)

	document.addEventListener(
		'characterAdd',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.characters.push({
				model3d: 'models/test.gltf', //TODO
				model: detail.character,
				movement: { index: {}, duration: 0 }, //TODO
				animation: { index: {}, duration: 0 }, //TODO
				position: [detail.x, 0, detail.z],
				rotation: detail.rotation,
			})
			characterList.display(currentScene.characters)
			jsonPreview.display(currentScene)
			await previewScene(currentScene, world, resources)
		},
		true
	)

	document.addEventListener(
		'characterUpdate',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			currentScene.characters[detail.index].position = [detail.x, 0, detail.z]
			currentScene.characters[detail.index].rotation = detail.rotation
			jsonPreview.display(currentScene)
			await previewScene(currentScene, world, resources)
		},
		true
	)

	document.addEventListener(
		'characterRemove',
		async function (event) {
			const detail = (<CustomEvent>event).detail
			const characterIndex = detail.index
			currentScene.characters.splice(characterIndex, 1)
			characterList.display(currentScene.characters)
			jsonPreview.display(currentScene)
			selectedCharacter.clear()
			await previewScene(currentScene, world, resources)
		},
		true
	)

	document.addEventListener(
		'characterSelected',
		function (event) {
			const detail = (<CustomEvent>event).detail
			const character = currentScene.characters[detail.index]
			selectedCharacter.display(parseInt(detail.index), character)
			const lightGreen = '00FF00'
			if (world && world.characters) {
				world.characters.forEach((c, index) => {
					if (c) {
						if (index === parseInt(detail.index)) {
							c.applyColorOverlay(lightGreen)
						} else {
							c.applyOriginalColors()
						}
					}
				})
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
		'togglePlay',
		function () {
			playing = !playing
			playPause.display(playing)
		},
		true
	)

	document.addEventListener(
		'restartScene',
		async function () {
			await previewScene(currentScene, world, resources)
			playing = true
			playPause.display(playing)
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
		},
		true
	)
}

main()
