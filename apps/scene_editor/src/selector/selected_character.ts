class SelectedCharacter {
	display(character: any) {
		const controls = document.getElementById('controls')

		const previous = document.getElementById('selected-character')
		if (previous) {
			previous.remove()
		}

		if (controls) {
			const container = document.createElement('div')
			container.setAttribute('id', 'selected-character')
            const h1 = document.createElement('h1')
            h1.textContent = 'Selected Character'
            const characterModel = document.createElement('h2')
            characterModel.textContent = character.model
            const position = document.createElement('p')
            position.textContent = `Position: ${character.position}`
            const rotation = document.createElement('p')
            rotation.textContent = `Rotation: ${character.rotation}`
            container.appendChild(h1)
            container.appendChild(characterModel)
            container.appendChild(position)
            container.appendChild(rotation)
            controls.appendChild(container)
		}
	}
}

export default SelectedCharacter
