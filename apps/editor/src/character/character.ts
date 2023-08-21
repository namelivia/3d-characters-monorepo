import * as THREE from 'three'
import { AnimatedCharacter } from 'common'

// Character with animations and toggleable parts
class ToggleableCharacter extends AnimatedCharacter {
	constructor(gltf: THREE.Object3D, animations: THREE.AnimationClip[]) {
		super(gltf, animations)
		this.hideAllParts()
	}

	hideAllParts = (): void => {
		this.gltf.traverse((object: THREE.Object3D) => {
			// Did this ever work?
			//if (object instanceof THREE.SkinnedMesh) {
			if (object.type === 'SkinnedMesh') {
				object.visible = false
			} else {
				console.debug('No need to hide:')
				console.debug(object)
			}
		})
	}

	showPart = (part: string): void => {
		const partObject = this.gltf.getObjectByName(part)
		if (partObject) {
			partObject.visible = true
		}
	}

	hidePart = (part: string): void => {
		const partObject = this.gltf.getObjectByName(part)
		if (partObject) {
			partObject.visible = false
		}
	}

	togglePartVisibility = (part: string): void => {
		const partObject = this.gltf.getObjectByName(part)
		if (partObject) {
			partObject.visible = !partObject.visible
		}
	}

	getVisibleParts = (): string[] => {
		const visibleParts: string[] = []
		this.gltf.traverse((object: THREE.Object3D) => {
			if (object instanceof THREE.SkinnedMesh) {
				if (object.visible) {
					visibleParts.push(object.name)
				}
			}
		})
		return visibleParts
	}
}

export default ToggleableCharacter
