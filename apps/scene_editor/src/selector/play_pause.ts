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

			const restartButton = document.createElement('button')
			restartButton.setAttribute('id', 'restart-button')
			restartButton.textContent = 'Restart'

			restartButton.addEventListener('click', (event) => {
				console.log('Restarting scene')
				event.preventDefault()
				const customEvent = new CustomEvent('restartScene')
				restartButton.dispatchEvent(customEvent)
			})

			div.appendChild(playPauseButton)
			div.appendChild(restartButton)
			controls.appendChild(div)
		}
	}
}

export default PlayPause
