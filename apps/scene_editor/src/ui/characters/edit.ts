class Edit {
    clear() {
		const previous = document.getElementById('selected-character')
		if (previous) {
			previous.remove()
		}
    }
	display(index: number, character: any) {
		const controls = document.getElementById('character-controls')

        this.clear()

		if (controls) {
			const form = document.createElement('form')
			form.setAttribute('id', 'selected-character')
			//PosX
			const posX = document.createElement('input')
			posX.setAttribute('type', 'number')
			posX.setAttribute('id', 'posX')
			posX.setAttribute('name', 'posX')
			posX.setAttribute('placeholder', 'X')
			posX.setAttribute('step', '1')
            posX.value = character.position[0]

			//PosZ
			const posZ = document.createElement('input')
			posZ.setAttribute('type', 'number')
			posZ.setAttribute('id', 'posZ')
			posZ.setAttribute('name', 'posZ')
			posZ.setAttribute('placeholder', 'Z')
			posZ.setAttribute('step', '1')
            posZ.value = character.position[2]

			const rotation = document.createElement('input')
			rotation.setAttribute('type', 'number')
			rotation.setAttribute('id', 'rotation')
			rotation.setAttribute('name', 'rotation')
			rotation.setAttribute('placeholder', 'Rot')
			rotation.setAttribute('min', '0')
			rotation.setAttribute('step', '1')
            rotation.value = character.rotation

			// Create a button element
			const updateButton = document.createElement('button')
			updateButton.setAttribute('id', 'character-update')
			updateButton.textContent = 'Update'

            updateButton.addEventListener('click', (event) => {
                event.preventDefault()
                const customEvent = new CustomEvent('characterUpdate', {
                    detail: {
                        index: index,
                        x: posX.value,
                        z: posZ.value,
                        rotation: rotation.value,
                    },
                })
                updateButton.dispatchEvent(customEvent)
			})

			const removeButton = document.createElement('button')
			removeButton.setAttribute('id', 'character-remove')
			removeButton.textContent = 'Remove'

            removeButton.addEventListener('click', (event) => {
                event.preventDefault()
                const customEvent = new CustomEvent('characterRemove', {
                    detail: {
                        index: index,
                    },
                })
                removeButton.dispatchEvent(customEvent)
			})

			form.appendChild(posX)
			form.appendChild(posZ)
			form.appendChild(rotation)
			form.appendChild(updateButton)
			form.appendChild(removeButton)

            controls.appendChild(form)
		}
	}
}

export default Edit
