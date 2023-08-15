import * as THREE from 'three'

class Selector {
	createCheckbox = (object: string) => {
		const checkboxElement = document.createElement('input')
		checkboxElement.type = 'checkbox'
		checkboxElement.id = object

		checkboxElement.addEventListener('change', function () {
			const customEvent = new CustomEvent('myCheckboxChange', {
				detail: object,
			})
			checkboxElement.dispatchEvent(customEvent)
		})

		const label = document.createElement('label')
		label.htmlFor = object
		label.appendChild(document.createTextNode(object))
		const li = document.createElement('li')
		li.appendChild(checkboxElement)
		li.appendChild(label)
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
