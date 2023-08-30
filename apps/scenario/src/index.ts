import { loadGLTF } from 'common'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { loadScene } from './scene/loader'
import World from './world/world'
import Overlay from './overlay/overlay'
import Audio from './audio/audio'

const setFullscreen = () => {
	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight
	const mainDiv = document.getElementById('3d-view')
	if (mainDiv) {
		mainDiv.style.width = `${windowWidth}px`
		mainDiv.style.height = `${windowHeight}px`
	}
}

const setScene = async (gltf: GLTF, world: World, sceneName: string) => {
	const scene = await loadScene(gltf, sceneName)
	world.loadScene(scene)
}

const main = async () => {
	const world = new World()
	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})
	const gltf = await loadGLTF('models/test.gltf')
	await setScene(gltf, world, 'scene2')
	const overlay = new Overlay()
	const audio = new Audio()
	audio.initialize(['media/music.ogg', 'media/music2.ogg'])

	overlay.addToDOM()
	overlay.fadeOut()
	setTimeout(() => {
		overlay.fadeIn()
		audio.startSong(0)
		audio.setSong(0)
	}, 1000)
	/*setTimeout(() => {
		audio.startSong(1)
		audio.setSong(1)
		overlay.setVideo('media/intro.mp4')
	}, 20000)*/
	setTimeout(async () => {
		audio.setSong(0)
		overlay.removeVideo()
		await setScene(gltf, world, 'scene1')
	}, 20000)

	const allowAudioButton = document.getElementById('music')
	if (allowAudioButton) {
		allowAudioButton.addEventListener('click', () => {
			audio.allow()
		})
	}
}

setFullscreen()
main()
