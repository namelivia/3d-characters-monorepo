class Actions {
	createButton = (action: string) => {
		const buttonElement = document.createElement('button')
		buttonElement.innerText = action
		buttonElement.addEventListener('click', () => {
			const customEvent = new CustomEvent('buttonClick', {
				detail: { action: action },
			})
			buttonElement.dispatchEvent(customEvent)
		})
		return buttonElement
	}

	display() {
		const result = document.getElementById('result')
		if (result) {
			const saveButton = this.createButton('Save')
			result.appendChild(saveButton)
		}
	}
}

export default Actions
