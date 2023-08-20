export default class Dialog {
	text = ''
	visible = false
	addToDOM() {
		const threeDView = document.getElementById('3d-view')
		const uiContainer = document.createElement('div')
		uiContainer.id = '2d-view'
		uiContainer.style.width = '100%'
		uiContainer.style.height = '200px'
		uiContainer.style.position = 'absolute'
		uiContainer.style.top = '0'
		uiContainer.style.userSelect = 'none'
		uiContainer.style.display = this.visible ? 'block' : 'none'

		const dialogBox = document.createElement('div')
		dialogBox.id = 'dialog-box'
		dialogBox.style.backgroundColor = 'rgba(0, 0, 255, 0.5)'
		dialogBox.style.margin = '24px'
		dialogBox.style.height = '100%'
		dialogBox.style.borderRadius = '24px'

		const dialogText = document.createElement('p')
		dialogText.id = 'dialog'
		dialogText.style.color = 'white'
		dialogText.style.position = 'absolute'
		dialogText.style.left = '48px'
		dialogText.style.top = '24px'
		dialogText.textContent = this.text

		dialogBox.appendChild(dialogText)
		uiContainer.appendChild(dialogBox)

		if (threeDView) {
			threeDView.appendChild(uiContainer)
		}
	}

	setText(text: string) {
		this.text = text
		const dialogText = document.getElementById('dialog')
		if (dialogText) {
			dialogText.textContent = text
		}
	}

	setVisible(visible: boolean) {
		this.visible = visible
		const uiContainer = document.getElementById('2d-view')
		if (uiContainer) {
			uiContainer.style.display = visible ? 'block' : 'none'
		}
	}
}
