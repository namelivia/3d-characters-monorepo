import { loadGLTF } from './gltf/loader'
import World from './world/world'
import Selector from './selector/selector'
import Actions from './actions/actions'

const saveSelectedObjects = (selectedObjects: [string?]) => {
	const bb = new Blob([JSON.stringify(selectedObjects)], { type: 'text/plain' })
	const a = document.createElement('a')
	a.download = 'character.json'
	a.href = window.URL.createObjectURL(bb)
	a.click()
}

const main = async () => {
	const selectedObjects: [string?] = []

	document.addEventListener(
		'myCheckboxChange',
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.visible) {
				world.add(objects[detail.model])
				selectedObjects.push(detail.model)
			} else {
				world.remove(objects[detail.model])
			}
		},
		true
	)

	document.addEventListener(
		'myButtonClick',
		function (event) {
			const detail = (<CustomEvent>event).detail
			if (detail.action === 'Save') {
				saveSelectedObjects(selectedObjects)
			}
		},
		true
	)

	const world = new World()
	world.initialize()
	const objects = await loadGLTF()
	const selector = new Selector()
	const actions = new Actions()
	actions.display()
	selector.display(objects)
	world.animate()
}

main()
