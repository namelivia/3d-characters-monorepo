import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loadGLTF = async (): Promise<GLTF> => {
	const loader = new GLTFLoader()
	return new Promise((resolve, reject) => {
		loader.load(
			'models/test.gltf',
			(data) => resolve(data),
			() => null,
			reject
		)
	})
}

export { loadGLTF }
