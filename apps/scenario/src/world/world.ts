import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getRandomColor } from '../colors/colors'
import Character from '../characters/character'
import Scene from '../scene/scene'

class World {
	scene?: THREE.Scene
	camera?: THREE.PerspectiveCamera
	renderer?: THREE.WebGLRenderer
	characters?: [Character?]
	time: number = 0

	initialize = () => {
		this.scene = new THREE.Scene()
		this.renderer = this.setupRenderer()
		this.camera = this.setupCamera()
		this.characters = []
		this.setupControls()
		this.setupLight()
		this.addFloor()
	}

	addFloor = (): void => {
		const grid = new THREE.GridHelper(12, 6, getRandomColor(), getRandomColor())
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
		camera.position.z = 15
		camera.position.y = 15
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
			this.time = this.time + 1
			this.characters?.forEach((character) => {
				character?.animate(this.time)
			})
			this.renderer.render(this.scene, this.camera)
		}
	}

	loadScene = (scene: Scene) => {
		scene.characters.forEach((character) => {
			this.addCharacter(character)
		})
	}

	addCharacter = (character: Character) => {
		this.characters?.push(character)
		if (this.scene) {
			character.addToScene(this.scene)
		}
	}

	remove = (object: THREE.Mesh) => {
		if (this.scene) {
			this.scene.remove(object)
		}
	}

	debug = () => {
		console.log(this.scene)
	}
}

export default World
