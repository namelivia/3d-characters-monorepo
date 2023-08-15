import * as THREE from 'three'

class Character {
	model: THREE.Group
	mixer: THREE.AnimationMixer
	constructor(model: THREE.Group, animations: THREE.AnimationClip[]) {
		this.model = model
		this.mixer = new THREE.AnimationMixer(model)
		this.playAnimation(animations[0])
		this.hideAllParts()
	}

	playAnimation = (animation: THREE.AnimationClip): void => {
		const action = this.mixer.clipAction(animation)
		action.play()
	}

	getModel = (): THREE.Group => {
		return this.model
	}

	hideAllParts = (): void => {
		this.model.traverse((object) => {
			if (object instanceof THREE.SkinnedMesh) {
				object.visible = false
			}
		})
	}

	showPart = (part: string): void => {
		const partObject = this.model.getObjectByName(part)
		if (partObject) {
			partObject.visible = true
		}
	}

	hidePart = (part: string): void => {
		const partObject = this.model.getObjectByName(part)
		if (partObject) {
			partObject.visible = false
		}
	}

	togglePartVisibility = (part: string): void => {
		const partObject = this.model.getObjectByName(part)
		if (partObject) {
			partObject.visible = !partObject.visible
		}
	}

	getVisibleParts = (): string[] => {
		const visibleParts: string[] = []
		this.model.traverse((object) => {
			if (object instanceof THREE.SkinnedMesh) {
				if (object.visible) {
					visibleParts.push(object.name)
				}
			}
		})
		return visibleParts
	}
}

export default Character
