import * as THREE from 'three'

class Character {
	model: THREE.Group
	mixer: THREE.AnimationMixer
	animations: THREE.AnimationClip[]

	constructor(model: THREE.Group, animations: THREE.AnimationClip[]) {
		this.model = model
		this.animations = animations
		this.mixer = new THREE.AnimationMixer(model)
		this.setAnimation('Idle')
		this.hideAllParts()
	}

	playAnimation = (animation: THREE.AnimationClip): void => {
		const action = this.mixer.clipAction(animation)
		action.play()
	}

	setAnimation = (animationName: string): void => {
		const animation = this.animations.find(
			(animation) => animation.name === animationName
		)
		console.log(animationName)
		console.log(this.animations)
		if (animation) {
			this.playAnimation(animation)
		}
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
