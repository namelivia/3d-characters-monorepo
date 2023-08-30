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
	resources: ResourceManager,
	world: World,
	sceneName: string
) => {
	const scene = await loadScene(resources, sceneName)
	world.loadScene(scene)
}

const main = async () => {
	const onSceneTransition = async (scene: string) => {
		await setScene(resources, world, scene)
	}

	const world = new World()
	const resources = new ResourceManager()
	world.setOnSceneTransition(onSceneTransition)
	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})
	// Load initial scene
	await setScene(resources, world, 'scene1')
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
