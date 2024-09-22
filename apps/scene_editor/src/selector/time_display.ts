class TimeDisplay {
	clear() {
		const previous = document.getElementById('time-display')
		if (previous) {
			previous.remove()
		}
	}
	display(time: number) {
		const controls = document.getElementById('controls')

		this.clear()

		if (controls) {
			const div = document.createElement('div')
			div.setAttribute('id', 'time-display')
			const timeLabel = document.createTextNode('Frame: ')
			const timeValue = document.createTextNode(time.toString())
			div.appendChild(timeLabel)
			div.appendChild(timeValue)

			controls.appendChild(div)
		}
	}
}

export default TimeDisplay
