import { SceneEditorJSON } from 'common'

class JsonPreview {
	display(scene: SceneEditorJSON) {
		const json = JSON.stringify(scene, null, 2)
		const pre = document.getElementById('json')
		if (pre) {
			pre.innerHTML = json
		}
	}
}

export default JsonPreview
