class Name {
	initialize = () => {
		const properties = document.getElementById('scene-properties')
		if (properties) {
			const label = document.createElement('label')
			label.textContent = 'Name'

			const input = document.createElement('input')
			input.setAttribute('id', 'name')
			input.setAttribute('type', 'text')

			// Append the label and input elements to the body
			properties.appendChild(label)
			properties.appendChild(input)

			input.addEventListener('change', function () {
				const customEvent = new CustomEvent('nameChange', {
					detail: input.value,
				})
				input.dispatchEvent(customEvent)
			})
		}
	}
}
export default Name
