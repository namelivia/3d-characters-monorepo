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

			//PosX
			const posX = document.createElement('input')
			posX.setAttribute('type', 'number')
			posX.setAttribute('id', 'posX')
			posX.setAttribute('name', 'posX')
			posX.setAttribute('placeholder', 'X')
			posX.setAttribute('min', '0')
			posX.setAttribute('step', '1')

			//PosZ
			const posZ = document.createElement('input')
			posZ.setAttribute('type', 'number')
			posZ.setAttribute('id', 'posZ')
			posZ.setAttribute('name', 'posZ')
			posZ.setAttribute('placeholder', 'Z')
			posZ.setAttribute('min', '0')
			posZ.setAttribute('step', '1')

			const rotation = document.createElement('input')
			rotation.setAttribute('type', 'number')
			rotation.setAttribute('id', 'rotation')
			rotation.setAttribute('name', 'rotation')
			rotation.setAttribute('placeholder', 'Rot')
			rotation.setAttribute('min', '0')
			rotation.setAttribute('step', '1')

			// Create a button element
			const addButton = document.createElement('button')
			addButton.setAttribute('id', 'character-add')
			addButton.textContent = 'Add'

			// Append all elements to the form
			form.appendChild(h4)
			form.appendChild(selector)
			form.appendChild(posX)
			form.appendChild(posZ)
			form.appendChild(rotation)
			form.appendChild(addButton)
			controls.appendChild(form)

			addButton.addEventListener('click', function (event) {
				event.preventDefault()
				const customEvent = new CustomEvent('characterAdd', {
					detail: {
						character: selector.value,
						x: parseInt(posX.value),
						z: parseInt(posZ.value),
						rotation: parseInt(rotation.value),
					},
				})
				addButton.dispatchEvent(customEvent)
				selector.value = ''
				posX.value = ''
				posZ.value = ''
				rotation.value = ''
			})
		}
	}
}

export default CharacterSelector
