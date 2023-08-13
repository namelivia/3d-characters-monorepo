import { loadGLTF } from './gltf/loader'
import { loadScene } from './scene/loader'
import World from './world/world'
import Dialog from './dialog/dialog'

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
	dialog.addToDOM()
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
	world.initialize()
	const gltf = await loadGLTF()
	const scene = await loadScene(gltf, 'scene1')
	world.loadScene(scene)
	world.animate()
}

setFullscreen()
main()
