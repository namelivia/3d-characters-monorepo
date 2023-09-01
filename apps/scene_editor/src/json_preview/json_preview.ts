class JsonPreview {
	display(json: string) {
		const pre = document.getElementById('json')
		if (pre) {
			pre.innerHTML = json
		}
	}
}

export default JsonPreview
