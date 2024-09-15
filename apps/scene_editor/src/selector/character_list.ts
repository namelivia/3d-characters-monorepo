import { CharactersJSON } from 'common'

class CharacterList {
	display(characters: CharactersJSON) {
		const controls = document.getElementById('controls')

		const previousList = document.getElementById('character-list')
		if (previousList) {
			previousList.remove()
		}

		if (controls) {
			const container = document.createElement('div')
			container.setAttribute('id', 'character-list')
			characters.forEach((character) => {
				const div = document.createElement('div')
				const model = document.createElement('span')
				model.textContent = character.model
				div.appendChild(model)
				const removeButton = document.createElement('button')
				removeButton.textContent = 'Remove'
				removeButton.addEventListener('click', (event) => {
					event.preventDefault()
					const customEvent = new CustomEvent('characterRemove', {
						detail: {
							index: characters.indexOf(character),
						},
					})
					removeButton.dispatchEvent(customEvent)
				})
				div.appendChild(removeButton)
				container.appendChild(div)
			})
			controls.appendChild(container)
		}
	}
}

export default CharacterList
