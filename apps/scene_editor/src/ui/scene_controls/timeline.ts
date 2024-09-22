class Timeline {
	clear() {
		const previous = document.getElementById('timeline')
		if (previous) {
			previous.remove()
		}
	}
	display(time: number) {
		const controls = document.getElementById('scene-controls')

		this.clear()

		if (controls) {
			const timeline = document.createElement('div')
			timeline.setAttribute('id', 'timeline')
            const cursor = document.createElement('div')
            cursor.setAttribute('id', 'cursor')
            cursor.style.left = `${time}px`
            timeline.appendChild(cursor)
			controls.appendChild(timeline)
		}
	}
}

export default Timeline
