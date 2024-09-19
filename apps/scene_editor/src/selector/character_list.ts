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
				const selected = document.createElement('input')
				selected.setAttribute('type', 'radio')
				selected.setAttribute('name', 'selected')
				selected.setAttribute('value', characters.indexOf(character).toString())
				const model = document.createElement('span')
				model.textContent = character.model
                selected.addEventListener('change', (event) => {
                    event.preventDefault()
                    const eventTarget = event.target as HTMLInputElement
                    const customEvent = new CustomEvent('characterSelected', {
                        detail: {
                            index: eventTarget.value,
                        },
                    })
                    selected.dispatchEvent(customEvent)
                })
				div.appendChild(selected)
				div.appendChild(model)
				container.appendChild(div)
			})
			controls.appendChild(container)
		}
	}
}

export default CharacterList
