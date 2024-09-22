class SceneSelector {
	display(scenes: string[]) {
		const properties = document.getElementById('scene-properties')
		if (properties) {
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
			properties.appendChild(selector)
		}
	}
}

export default SceneSelector
