import { loadGLTF } from 'common'
import { loadScene } from './scene/loader'
import World from './world/world'
import Dialog from './dialog/dialog'
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

const main = async () => {
	const world = new World()
	const dialog = new Dialog()
	const overlay = new Overlay()
	const audio = new Audio()
	audio.initialize(['media/music.ogg', 'media/music2.ogg'])

	dialog.addToDOM()
	overlay.addToDOM()
	overlay.fadeOut()
	setTimeout(() => {
		overlay.fadeIn()
		audio.startSong(0)
		audio.setSong(0)
	}, 1000)
	setTimeout(() => {
		dialog.setText('Hello world!')
		dialog.setVisible(true)
	}, 5000)
	setTimeout(() => {
		dialog.setText("This is just a test. Don't be too harsh on me.")
	}, 10000)
	setTimeout(() => {
		dialog.setText('')
		dialog.setVisible(false)
	}, 15000)
	setTimeout(() => {
		audio.startSong(1)
		audio.setSong(1)
		overlay.setVideo('media/intro.mp4')
	}, 20000)
	setTimeout(() => {
		audio.setSong(0)
		overlay.removeVideo()
	}, 25000)
	world.initialize()
	const gltf = await loadGLTF()
	const scene = await loadScene(gltf, 'scene1')
	world.loadScene(scene)

	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})

	const allowAudioButton = document.getElementById('music')
	if (allowAudioButton) {
		allowAudioButton.addEventListener('click', () => {
			audio.allow()
		})
	}
}

setFullscreen()
main()
