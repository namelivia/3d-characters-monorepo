import * as THREE from 'three'

class Selector {
	createCheckbox = (object: string) => {
		const container = document.createElement('div') // Create a container for checkbox and color input

		// Create checkbox element
		const checkboxElement = document.createElement('input')
		checkboxElement.type = 'checkbox'
		checkboxElement.id = object

		checkboxElement.addEventListener('change', function () {
			const customEvent = new CustomEvent('myCheckboxChange', {
				detail: object,
			})
			checkboxElement.dispatchEvent(customEvent)
		})

		// Create label for checkbox
		const label = document.createElement('label')
		label.htmlFor = object
		label.appendChild(document.createTextNode(object))

		// Create color input element
		const colorInput = document.createElement('input')
		colorInput.type = 'color'

		colorInput.addEventListener('change', function () {
			const customEvent = new CustomEvent('colorInputChange', {
				detail: object,
			})
			colorInput.dispatchEvent(customEvent)
		})

		// Append elements to the container
		container.appendChild(checkboxElement)
		container.appendChild(label)
		container.appendChild(colorInput)

		const li = document.createElement('li')
		li.appendChild(container)

		return li
	}

	display(model: THREE.Group) {
		const list = document.getElementById('list')
		if (list) {
			model.traverse((child) => {
				if (child instanceof THREE.SkinnedMesh) {
					const checkbox = this.createCheckbox(child.name)
					list.appendChild(checkbox)
				}
			})
		}
	}
}

export default Selector
