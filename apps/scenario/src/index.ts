import { loadGLTF } from './gltf/loader'
import { loadScene } from './scene/loader'
import World from './world/world'

const main = async () => {
	const world = new World()
	world.initialize()
	const gltf = await loadGLTF()
	const scene = await loadScene(gltf, 'scene1')
	world.loadScene(scene)
	world.animate()
}

main()
