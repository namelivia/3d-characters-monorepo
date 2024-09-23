import { DialogsJSON } from 'common'

class List {
	display(dialogs: DialogsJSON) {
		const controls = document.getElementById('dialog-controls')

		const previousList = document.getElementById('dialog-list')
		if (previousList) {
			previousList.remove()
		}

		if (controls) {
			const container = document.createElement('div')
			container.setAttribute('id', 'dialog-list')
			dialogs.forEach((dialog) => {
				const div = document.createElement('div')
				const selected = document.createElement('input')
				selected.setAttribute('type', 'radio')
				selected.setAttribute('name', 'selected')
				selected.setAttribute('value', dialogs.indexOf(dialog).toString())
				const model = document.createElement('span')
				model.textContent = dialog.text
                selected.addEventListener('change', (event) => {
                    event.preventDefault()
                    const eventTarget = event.target as HTMLInputElement
                    const customEvent = new CustomEvent('dialogSelected', {
                        detail: {
                            index: eventTarget.value,
                        },
                    })
                    selected.dispatchEvent(customEvent)
                })
				div.appendChild(selected)
				div.appendChild(model)
				container.appendChild(div)
			})
			controls.appendChild(container)
		}
	}
}

export default List
