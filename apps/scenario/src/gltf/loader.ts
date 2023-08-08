import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const processGLTF = (gltf: GLTF): { [name: string]: THREE.Mesh } => {
	const objects: { [name: string]: THREE.Mesh } = {}

	// Load and store all objects
	gltf.scene.traverse((child: THREE.Object3D) => {
		if (child instanceof THREE.Mesh) {
			objects[child.name] = child
		}
	})
	return objects
}

const loadGLTF = async (): Promise<{ [name: string]: THREE.Mesh }> => {
	//Load a model using GLTFLoader
	const loader = new GLTFLoader()
	return new Promise((resolve, reject) => {
		loader.load(
			'models/test.gltf',
			(data) => resolve(processGLTF(data)),
			() => null,
			reject
		)
	})
}

export { loadGLTF }
