class Transition {
	initialize = () => {
		const controls = document.getElementById('controls')
		if (controls) {
			const form = document.createElement('form')

			// Create an h4 element
			const h4 = document.createElement('h4')
			h4.textContent = 'Transition'

			// Create a label for Keyframe
			const keyframeLabel = document.createElement('label')
			keyframeLabel.textContent = 'Keyframe'

			// Create an input element for Keyframe
			const keyframeInput = document.createElement('input')
			keyframeInput.setAttribute('min', '0')
			keyframeInput.setAttribute('id', 'transition-keyframe')
			keyframeInput.setAttribute('type', 'number')

			// Create a label for Scene
			const sceneLabel = document.createElement('label')
			sceneLabel.textContent = 'Scene'

			// Create an input element for Scene
			const sceneInput = document.createElement('input')
			sceneInput.setAttribute('id', 'transition-scene')
			sceneInput.setAttribute('type', 'text')

			// Create a button element
			const addButton = document.createElement('button')
			addButton.setAttribute('id', 'transition-add')
			addButton.textContent = 'Add'

			// Append all elements to the form
			form.appendChild(h4)
			form.appendChild(keyframeLabel)
			form.appendChild(keyframeInput)
			form.appendChild(sceneLabel)
			form.appendChild(sceneInput)
			form.appendChild(addButton)

			// Append the form to the document's body or any other desired location in the DOM
			controls.appendChild(form)

			addButton.addEventListener('click', function (event) {
				event.preventDefault()
				const customEvent = new CustomEvent('transitionAdd', {
					detail: {
						keyframe: keyframeInput.value,
						scene: sceneInput.value,
					},
				})
				addButton.dispatchEvent(customEvent)
				keyframeInput.value = ''
				sceneInput.value = ''
			})
		}
	}
}
export default Transition
