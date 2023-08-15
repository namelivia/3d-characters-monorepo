import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getRandomColor } from '../colors/colors'
import Character from '../character/character'

class World {
	scene?: THREE.Scene
	camera?: THREE.PerspectiveCamera
	renderer?: THREE.WebGLRenderer
	mixers: THREE.AnimationMixer[] = []

	initialize = () => {
		this.scene = new THREE.Scene()
		this.renderer = this.setupRenderer()
		this.camera = this.setupCamera()
		this.setupControls()
		this.setupLight()
		this.addFloor()
	}

	addFloor = (): void => {
		const grid = new THREE.GridHelper(6, 6, getRandomColor(), getRandomColor())
		if (this.scene) {
			this.scene.add(grid)
		}
	}

	setupLight = (): void => {
		const light = new THREE.AmbientLight(0xf5f5f5)
		if (this.scene) {
			this.scene.add(light)
		}
	}

	setupCamera = (): THREE.PerspectiveCamera => {
		const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
		camera.position.z = 5
		camera.position.y = 5
		return camera
	}

	setupRenderer = (): THREE.WebGLRenderer => {
		const renderer = new THREE.WebGLRenderer()
		const container = document.getElementById('3d-view')
		if (container) {
			const width = container.clientWidth
			const height = container.clientHeight
			renderer.setSize(width, height)
			container.appendChild(renderer.domElement)
		}
		return renderer
	}

	setupControls = () => {
		if (this.camera && this.renderer) {
			new OrbitControls(this.camera, this.renderer.domElement)
		}
	}

	animate = () => {
		if (this.camera && this.renderer && this.scene) {
			requestAnimationFrame(this.animate)
			this.mixers.forEach((mixer) => mixer.update(0.01))
			this.renderer.render(this.scene, this.camera)
		}
	}

	add = (character: Character) => {
		if (this.scene) {
			this.scene.add(character.getModel())
			this.mixers.push(character.mixer)
		}
	}

	remove = (character: Character) => {
		if (this.scene) {
			this.scene.remove(character.getModel())
			this.mixers = this.mixers.filter((mixer) => mixer !== character.mixer)
		}
	}
}

export default World
