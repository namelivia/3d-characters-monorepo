class Edit {
    clear() {
		const previous = document.getElementById('selected-dialog')
		if (previous) {
			previous.remove()
		}
    }
	display(index: number, dialog: any) {
		const controls = document.getElementById('dialog-controls')

        this.clear()

		if (controls) {
			const form = document.createElement('form')
			form.setAttribute('id', 'selected-dialog')

			//start
			const start = document.createElement('input')
			start.setAttribute('type', 'number')
			start.setAttribute('id', 'start')
			start.setAttribute('name', 'start')
			start.setAttribute('placeholder', 'start')
			start.setAttribute('step', '1')
            start.value = dialog.start

			//duration
			const duration = document.createElement('input')
			duration.setAttribute('type', 'number')
			duration.setAttribute('id', 'duration')
			duration.setAttribute('name', 'duration')
			duration.setAttribute('placeholder', 'duration')
			duration.setAttribute('step', '1')
            duration.value = dialog.duration

            //text
            const text = document.createElement('input')
            text.setAttribute('type', 'text')
            text.setAttribute('id', 'text')
            text.setAttribute('name', 'text')
            text.setAttribute('placeholder', 'text')
            text.value = dialog.text

			// Create a button element
			const updateButton = document.createElement('button')
			updateButton.setAttribute('id', 'dialog-update')
			updateButton.textContent = 'Update'

            updateButton.addEventListener('click', (event) => {
                event.preventDefault()
                const customEvent = new CustomEvent('dialogUpdate', {
                    detail: {
                        index: index,
                        start: start.value,
                        duration: duration.value,
                        text: text.value,
                    },
                })
                updateButton.dispatchEvent(customEvent)
			})

			const removeButton = document.createElement('button')
			removeButton.setAttribute('id', 'dialog-remove')
			removeButton.textContent = 'Remove'

            removeButton.addEventListener('click', (event) => {
                event.preventDefault()
                const customEvent = new CustomEvent('dialogRemove', {
                    detail: {
                        index: index,
                    },
                })
                removeButton.dispatchEvent(customEvent)
			})

			form.appendChild(start)
			form.appendChild(duration)
			form.appendChild(text)
			form.appendChild(updateButton)
			form.appendChild(removeButton)

            controls.appendChild(form)
		}
	}
}

export default Edit
