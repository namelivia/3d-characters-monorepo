import Selector from './selector/selector'
import Actions from './actions/actions'
import { loadGLTF, BasicWorld } from 'common'
import ToggleableCharacter from './character/character'

const saveSelectedObjects = (selectedObjects: string[]) => {
	const bb = new Blob([JSON.stringify(selectedObjects)], { type: 'text/plain' })
	const a = document.createElement('a')
	a.download = 'character.json'
	a.href = window.URL.createObjectURL(bb)
	a.click()
}

const main = async () => {
	// Load 3d model
	const model = await loadGLTF('models/test.gltf')

	// Initialize the UI
	const selector = new Selector()
	selector.display(model.scene)
	const actions = new Actions()
	actions.display()

	// Initialize world and character
	const world = new BasicWorld()
	world.initialize()
	world.addFloorGrid()
	const character = new ToggleableCharacter(model.scene, model.animations)
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
