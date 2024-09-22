import { BasicSceneJSON } from 'common'

class JsonPreview {
	display(scene: BasicSceneJSON) {
		const result = document.getElementById('result')
        if (result) {
		    const json = JSON.stringify(scene, null, 2)
            const pre = document.createElement('pre')
            if (pre) {
                pre.innerHTML = json
            }
            result.appendChild(pre)
        }
	}
}

export default JsonPreview
