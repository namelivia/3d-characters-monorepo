import * as THREE from 'three'
import { Timesheet } from './timesheet'
import { Movement } from './movement'
import { AnimatedCharacter } from 'common'

class ScenarioCharacter extends AnimatedCharacter {
	gltf: THREE.Object3D
	movement?: Movement
	timesheet?: Timesheet

	cleanupGLTF(gltf: THREE.Object3D, parts: string[]) {
		//Remove all meshes that are not bones or parts of the character
		const armature = gltf.children[0]
		armature.children = armature.children.filter((child) => {
			return child.type === 'Bone' || parts.includes(child.name)
		})
	}

	constructor(
		gltf: THREE.Object3D,
		animations: THREE.AnimationClip[],
		parts: string[]
	) {
		super(gltf, animations)
		this.gltf = gltf
		this.cleanupGLTF(gltf, parts)
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
