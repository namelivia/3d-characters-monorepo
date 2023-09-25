class CharacterSelector {
	display(characters: string[]) {
		const controls = document.getElementById('controls')
		if (controls) {
			const form = document.createElement('form')
			// Create an h4 element
			const h4 = document.createElement('h4')
			h4.textContent = 'Character'

			const selector = document.createElement('select')
			selector.setAttribute('id', 'character-select')

			const defaultOption = document.createElement('option')
			defaultOption.setAttribute('disabled', 'true')
			defaultOption.setAttribute('selected', 'true')
			defaultOption.setAttribute('value', '')
			defaultOption.textContent = '-- choose a character --'

			selector.appendChild(defaultOption)
			characters.forEach((character) => {
				const option = document.createElement('option')
				option.text = character
				selector.add(option)
			})

			// Create a button element
			const addButton = document.createElement('button')
			addButton.setAttribute('id', 'character-add')
			addButton.textContent = 'Add'

			// Append all elements to the form
			form.appendChild(h4)
			form.appendChild(selector)
			form.appendChild(addButton)
			controls.appendChild(form)

			addButton.addEventListener('click', function (event) {
				event.preventDefault()
				const customEvent = new CustomEvent('characterAdd', {
					detail: {
						character: selector.value,
					},
				})
				addButton.dispatchEvent(customEvent)
				selector.value = ''
			})
		}
	}
}

export default CharacterSelector
