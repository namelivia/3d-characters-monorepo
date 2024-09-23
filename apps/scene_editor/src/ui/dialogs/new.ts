class New {
	initialize = () => {
		const controls = document.getElementById('dialog-controls')
		if (controls) {
			const form = document.createElement('form')
			// Create a label for Keyframe
			const keyframeLabel = document.createElement('label')
			keyframeLabel.textContent = 'Keyframe'

			// Create an input element for Keyframe
			const keyframeInput = document.createElement('input')
			keyframeInput.setAttribute('min', '0')
			keyframeInput.setAttribute('id', 'dialog-keyframe')
			keyframeInput.setAttribute('type', 'number')

			// Create a label for Duration
			const durationLabel = document.createElement('label')
			durationLabel.textContent = 'Duration'

			// Create an input element for Duration
			const durationInput = document.createElement('input')
			durationInput.setAttribute('min', '0')
			durationInput.setAttribute('id', 'dialog-duration')
			durationInput.setAttribute('type', 'number')

			// Create a label for Text
			const textLabel = document.createElement('label')
			textLabel.textContent = 'Text'

			// Create an input element for Text
			const textInput = document.createElement('input')
			textInput.setAttribute('id', 'dialog-text')
			textInput.setAttribute('type', 'text')

			// Create a button element
			const addButton = document.createElement('button')
			addButton.setAttribute('id', 'dialog-add')
			addButton.textContent = 'Add'

			// Append all elements to the form
			form.appendChild(keyframeLabel)
			form.appendChild(keyframeInput)
			form.appendChild(durationLabel)
			form.appendChild(durationInput)
			form.appendChild(textLabel)
			form.appendChild(textInput)
			form.appendChild(addButton)
			controls.appendChild(form)

			addButton.addEventListener('click', function (event) {
				event.preventDefault()
				const customEvent = new CustomEvent('dialogAdd', {
					detail: {
						keyframe: keyframeInput.value,
						duration: durationInput.value,
						text: textInput.value,
					},
				})
				addButton.dispatchEvent(customEvent)
				keyframeInput.value = ''
				textInput.value = ''
				durationInput.value = ''
			})
		}
	}
}
export default New
