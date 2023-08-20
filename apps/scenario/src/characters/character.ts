import * as THREE from 'three'
import { Timesheet } from './timesheet'
import { Movement } from './movement'
import { AnimatedCharacter } from 'common'

type Part = {
	part: string
	color: string | null
}

class ScenarioCharacter extends AnimatedCharacter {
	gltf: THREE.Object3D
	movement?: Movement
	timesheet?: Timesheet

	cleanupGLTF(parts: string[]) {
		//Remove all meshes that are not bones or parts of the character
		const armature = this.gltf.children[0]
		armature.children = armature.children.filter((child) => {
			return child.type === 'Bone' || parts.includes(child.name)
		})
	}

	applyColors(parts: Part[]) {
		const armature = this.gltf.children[0]
		armature.children.forEach((child) => {
			if (child.type === 'SkinnedMesh') {
				const mesh = child as THREE.Mesh
				const part = parts.find((part) => part.part === child.name)
				if (part) {
					if (part.color) {
						const material = mesh.material as THREE.MeshStandardMaterial
						const newMaterial = material.clone()
						newMaterial.map = null
						newMaterial.color = new THREE.Color(parseInt(part.color, 16))
						mesh.material = newMaterial
					}
				}
			}
		})
	}

	constructor(
		gltf: THREE.Object3D,
		animations: THREE.AnimationClip[],
		parts: Part[]
	) {
		super(gltf, animations)
		this.gltf = gltf
		this.applyColors(parts)
		this.cleanupGLTF(parts.map((part) => part.part))
	}

	setTimesheet(timesheet: Timesheet) {
		this.timesheet = timesheet
	}

	update(time: number) {
		this.updateMovement(time)
		this.updateAnimation(time)
	}

	updateAnimation(time: number) {
		if (this.timesheet) {
			const animation = this.timesheet.getAnimation(time)
			this.setAnimation(animation)
		}
	}

	updateMovement(time: number) {
		if (this.timesheet) {
			const movement = this.timesheet.getMovement(time)
			movement.move(this.gltf)
		}
	}
}

export { ScenarioCharacter }
