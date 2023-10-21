import Selector from './selector/selector'
import Actions from './actions/actions'
import { BasicWorld, AnimatedCharacter, ResourceManager } from 'common'
//import ToggleableCharacter from './character/character'

const saveSelectedObjects = (selectedObjects: string[]) => {
	const bb = new Blob([JSON.stringify(selectedObjects)], { type: 'text/plain' })
	const a = document.createElement('a')
	a.download = 'character.json'
	a.href = window.URL.createObjectURL(bb)
	a.click()
}

const main = async () => {
	const model3d = 'http://localhost:3001/models/test.gltf'
	const resources = new ResourceManager()
	await resources.load({
		models3d: [model3d],
	})
	// Initialize the UI
	const selector = new Selector()
	const actions = new Actions()
	actions.display()

	// Initialize world and character
	const world = new BasicWorld()
	world.initialize()
	world.addFloorGrid()

	//Initialize the character
	const character = new AnimatedCharacter(model3d, 'missing_configuration')
	const gltf = resources.getModel3d(character.model3d)
	character.setGLTF(gltf.scene)
	selector.display(gltf.scene)
	character.setAnimations(gltf.animations)
	/*const parts = await loadParts(character.configuration); // Fetch the parts from it's json file
    character.setParts(parts);
    */
	world.add(character)

	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})

	// Initialize UI Event listener
	document.addEventListener(
		'myCheckboxChange',
		function (event) {
			const detail = (<CustomEvent>event).detail
			character.togglePartVisibility(detail)
		},
		true
	)

	document.addEventListener(
		'colorInputChange',
		function (event) {
			const detail = (<CustomEvent>event).detail
			const input = event.target as HTMLInputElement
			const colorHex = input.value.replace('#', '0x')
			character.changePartColor(detail, colorHex)
		},
		true
	)

	document.addEventListener(
		'myButtonClick',
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(character.getVisibleParts())
			}
		},
		true
	)
}

main()
