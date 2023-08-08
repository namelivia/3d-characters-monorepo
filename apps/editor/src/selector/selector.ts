class Selector {
	createCheckbox = (object: string) => {
		const checkboxElement = document.createElement('input')
		checkboxElement.type = 'checkbox'
		checkboxElement.id = object

		checkboxElement.addEventListener('change', function () {
			const value = checkboxElement.checked
			const customEvent = new CustomEvent('myCheckboxChange', {
				detail: { model: object, visible: value },
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

	display(objects: { [name: string]: THREE.Mesh }) {
		const list = document.getElementById('list')
		if (list) {
			for (const object in objects) {
				const checkbox = this.createCheckbox(object)
				list.appendChild(checkbox)
			}
		}
	}
}

export default Selector
