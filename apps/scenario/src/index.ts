import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { loadScene } from './scene/loader'
import World from './world/world'
import Overlay from './overlay/overlay'
import Audio from './audio/audio'
import ResourceManager from './resource_manager/resource_manager'

const setFullscreen = () => {
	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight
	const mainDiv = document.getElementById('3d-view')
	if (mainDiv) {
		mainDiv.style.width = `${windowWidth}px`
		mainDiv.style.height = `${windowHeight}px`
	}
}

const setScene = async (
	gltf: GLTF,
	scenario: GLTF,
	world: World,
	sceneName: string
) => {
	const scene = await loadScene(gltf, scenario, sceneName)
	world.loadScene(scene)
}

const main = async () => {
	const onSceneTransition = async (scene: string) => {
		await setScene(gltf, scenario, world, scene)
	}

	const world = new World()
	const resources = new ResourceManager()
	await resources.load({
		models3d: ['models/test.gltf', 'models/scene.gltf'],
	})
	world.setOnSceneTransition(onSceneTransition)
	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})
	const gltf = resources.getModel3d('models/test.gltf')
	const scenario = resources.getModel3d('models/scene.gltf')
	// Load initial scene
	await setScene(gltf, scenario, world, 'scene1')
	const overlay = new Overlay()
	const audio = new Audio()
	audio.initialize(['media/music.ogg', 'media/music2.ogg'])

	overlay.addToDOM()
	overlay.fadeOut()
	setTimeout(() => {
		overlay.fadeIn()
		audio.startSong('media/music.ogg')
		audio.setSong('media/music.ogg')
	}, 1000)
	/*setTimeout(() => {
		audio.startSong('media/music2.ogg')
		audio.setSong('media/music2.ogg')
		overlay.setVideo('media/intro.mp4')
	}, 20000)*/

	const allowAudioButton = document.getElementById('music')
	if (allowAudioButton) {
		allowAudioButton.addEventListener('click', () => {
			audio.allow()
		})
	}
}

setFullscreen()
main()
