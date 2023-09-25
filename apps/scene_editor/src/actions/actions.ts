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
		const actionsDiv = document.getElementById('actions')
		if (actionsDiv) {
			const saveButton = this.createButton('Save')
			actionsDiv.appendChild(saveButton)
			const previewButton = this.createButton('Preview')
			actionsDiv.appendChild(previewButton)
		}
	}
}

export default Actions
