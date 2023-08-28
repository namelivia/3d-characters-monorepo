import { loadGLTF } from 'common'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type Resources = {
	models3d: string[]
}

type Model3d = {
	gltf: GLTF
	key: string
}

class ResourceManager {
	models3d: Model3d[]

	constructor() {
		this.models3d = []
	}

	load = async (resources: Resources) => {
		for (const model of resources.models3d) {
			this.models3d.push({
				gltf: await loadGLTF(model),
				key: model,
			})
		}
	}

	getModel3d = (key: string): GLTF => {
		const model = this.models3d.filter((model3d) => {
			if (model3d.key === key) {
				return model3d
			}
		})
		if (model.length === 0) {
			throw Error(`Could not retrieve 3d model with key ${key}`)
		}
		return model[0].gltf
	}
}

export default ResourceManager
