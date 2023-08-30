import { loadGLTF } from 'common'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type Resources = {
	models3d: string[]
}

type Model3d = {
	gltf: GLTF
	key: string
}

//TODO: Implement a way to get rid of things that are not necessary anymore.

class ResourceManager {
	models3d: Model3d[]

	constructor() {
		this.models3d = []
	}

	load = async (resources: Resources) => {
		//TODO: Only iterate the models that are not
		// already loaded.
		for (const model of resources.models3d) {
			this.models3d.push({
				gltf: await loadGLTF(model),
				key: model,
			})
		}
	}

	getModel3d = (key: string): GLTF => {
		const model = this.models3d.find((model3d) => model3d.key === key)
		if (model) {
			return model.gltf
		}
		throw Error(`Could not retrieve 3d model with key ${key}`)
	}
}

export default ResourceManager
