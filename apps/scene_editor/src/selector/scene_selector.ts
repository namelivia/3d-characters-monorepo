class SceneSelector {
	display(scenes: string[]) {
		const controls = document.getElementById('controls')
		if (controls) {
			const selector = document.createElement('select')
			selector.setAttribute('id', 'scene-select')

			const defaultOption = document.createElement('option')
			defaultOption.setAttribute('disabled', 'true')
			defaultOption.setAttribute('selected', 'true')
			defaultOption.setAttribute('value', '')
			defaultOption.textContent = '-- choose a scene --'

			selector.appendChild(defaultOption)
			scenes.forEach((scene) => {
				const option = document.createElement('option')
				option.text = scene
				selector.add(option)
			})
			selector.addEventListener('change', function () {
				const customEvent = new CustomEvent('sceneSelectorChange', {
					detail: selector.value,
				})
				selector.dispatchEvent(customEvent)
			})
			controls.appendChild(selector)
		}
	}
}

export default SceneSelector
