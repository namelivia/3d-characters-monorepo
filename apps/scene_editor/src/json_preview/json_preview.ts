import { BasicSceneJSON } from 'common'

class JsonPreview {
	display(scene: BasicSceneJSON) {
		const json = JSON.stringify(scene, null, 2)
		const pre = document.getElementById('json')
		if (pre) {
			pre.innerHTML = json
		}
        const details = document.createElement('details')
        details.innerHTML = `<summary>JSON</summary><pre>${json}</pre>`
	}
}

export default JsonPreview
