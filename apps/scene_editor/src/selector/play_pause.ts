class PlayPause {
	clear() {
		const previous = document.getElementById('play-pause')
		if (previous) {
			previous.remove()
		}
	}
	display(playing: boolean) {
		const controls = document.getElementById('controls')

		this.clear()

		if (controls) {
			const div = document.createElement('div')
			div.setAttribute('id', 'play-pause')

			const playPauseButton = document.createElement('button')
			playPauseButton.setAttribute('id', 'play-pause-button')
			playPauseButton.textContent = playing ? 'Pause' : 'Play'

			playPauseButton.addEventListener('click', (event) => {
				event.preventDefault()
				const customEvent = new CustomEvent('togglePlay')
				playPauseButton.dispatchEvent(customEvent)
			})

			div.appendChild(playPauseButton)
			controls.appendChild(div)
		}
	}
}

export default PlayPause
