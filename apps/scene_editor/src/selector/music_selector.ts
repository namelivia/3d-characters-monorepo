class MusicSelector {
	display(musics: string[]) {
		const controls = document.getElementById('controls')
		if (controls) {
			const selector = document.createElement('select')
			selector.setAttribute('id', 'music-select')

			const defaultOption = document.createElement('option')
			defaultOption.setAttribute('disabled', 'true')
			defaultOption.setAttribute('selected', 'true')
			defaultOption.setAttribute('value', '')
			defaultOption.textContent = '-- choose a music --'

			selector.appendChild(defaultOption)
			musics.forEach((music) => {
				const option = document.createElement('option')
				option.text = music
				selector.add(option)
			})
			selector.addEventListener('change', function () {
				const customEvent = new CustomEvent('musicSelectorChange', {
					detail: selector.value,
				})
				selector.dispatchEvent(customEvent)
			})
			controls.appendChild(selector)
		}
	}
}

export default MusicSelector
