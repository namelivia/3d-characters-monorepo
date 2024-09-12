import Selector from './selector/selector'
import Actions from './actions/actions'
import { BasicWorld, Character, ResourceManager } from 'common'

const saveSelectedObjects = (
	selectedObjects: { part: string; color: string | null }[]
) => {
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
	const world = new BasicWorld("3d-view")
	world.initialize()
	world.addFloorGrid()

	//Initialize the character
	const character = new Character(model3d, 'missing_configuration')
	const gltf = resources.getModel3d(character.model3d)
	const loadedCharacter = character.setGLTF(gltf.scene)
	selector.display(gltf.scene)
	const animatedCharacter = loadedCharacter.setAnimations(gltf.animations)
	animatedCharacter.hideAllParts()
	world.add(animatedCharacter)

	requestAnimationFrame(function animate() {
		world.step()
		requestAnimationFrame(animate)
	})

	// Initialize UI Event listener
	document.addEventListener(
		'myCheckboxChange',
		function (event) {
			const detail = (<CustomEvent>event).detail
			animatedCharacter.togglePartVisibility(detail)
		},
		true
	)

	document.addEventListener(
		'colorInputChange',
		function (event) {
			const detail = (<CustomEvent>event).detail
			const input = event.target as HTMLInputElement
			const colorHex = input.value.replace('#', '0x')
			animatedCharacter.changePartColor(detail, colorHex)
		},
		true
	)

	document.addEventListener(
		'myButtonClick',
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(animatedCharacter.getVisibleParts())
			}
		},
		true
	)
}

main()
