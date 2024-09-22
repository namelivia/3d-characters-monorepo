import { BasicSceneJSON } from 'common'

class JsonPreview {
	clear() {
		const previous = document.getElementById('json-preview')
		if (previous) {
			previous.remove()
		}
	}
	display(scene: BasicSceneJSON) {
		const result = document.getElementById('result')
		this.clear()
		if (result) {
			const json = JSON.stringify(scene, null, 2)
			const pre = document.createElement('pre')
			pre.setAttribute('id', 'json-preview')
			if (pre) {
				pre.innerHTML = json
			}
			result.appendChild(pre)
		}
	}
}

export default JsonPreview
