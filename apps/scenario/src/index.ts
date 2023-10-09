import Overlay from './overlay/overlay'
import Audio from './audio/audio'
import {
    ResourceManager,
    AdvancedWorld,
    loadAdvancedScene,
    loadAdvancedSceneResources,
    assignAdvancedSceneResources,
} from 'common'

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
	audio: Audio,
	world: AdvancedWorld,
	sceneName: string
) => {
	const scene = await loadAdvancedScene(sceneName) // Load the scene form the json
    await loadAdvancedSceneResources(resources, scene) // Request the resources associated to the scene
    await assignAdvancedSceneResources(resources, scene) // Assign them (this could be together)
	world.loadScene(scene)
}

const main = async () => {
	const onSceneTransition = async (scene: string) => {
		await setScene(resources, audio, world, scene)
	}

	const overlay = new Overlay()
	const audio = new Audio()
	const world = new AdvancedWorld()
	const resources = new ResourceManager()

	world.setOnSceneTransition(onSceneTransition)
	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})
	// Load initial scene
	await setScene(resources, audio, world, 'scene1')

	overlay.addToDOM()
	overlay.fadeOut()
	setTimeout(() => {
		overlay.fadeIn()
	}, 1000)
	/*setTimeout(() => {
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
