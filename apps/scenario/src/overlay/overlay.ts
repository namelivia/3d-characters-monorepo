export default class Overlay {
	addToDOM() {
		const threeDView = document.getElementById('3d-view')
		const overlayContainer = document.createElement('div')
		overlayContainer.id = '2d-overlay'
		overlayContainer.style.width = '100%'
		overlayContainer.style.height = '100%'
		overlayContainer.style.position = 'absolute'
		overlayContainer.style.top = '0'
		overlayContainer.style.userSelect = 'none'
		overlayContainer.style.display = 'block'
		overlayContainer.style.transition = 'background-color 3s ease-in-out'
		overlayContainer.style.pointerEvents = 'none'

		if (threeDView) {
			threeDView.appendChild(overlayContainer)
		}
	}

	fadeOut() {
		const overlay = document.getElementById('2d-overlay')
		if (overlay) {
			overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)'
		}
	}

	fadeIn() {
		const overlay = document.getElementById('2d-overlay')
		if (overlay) {
			overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
		}
	}
}
