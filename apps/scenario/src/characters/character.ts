import * as THREE from 'three'
import { Timesheet } from './timesheet'
import { Movement } from './movement'
import { Character } from 'common'

class ScenarioCharacter extends Character {
	parts: string[] = []
	objects: THREE.Mesh[] = []
	movement?: Movement
	timesheet?: Timesheet

	constructor(gltf: THREE.Object3D, parts: string[]) {
		super(gltf)
		this.parts = parts
		this.objects = this.parts.map((part: string) => {
			return gltf.getObjectByName(part) as THREE.Mesh
		})
	}

	addToScene(scene: THREE.Scene) {
		this.objects.forEach((object: THREE.Mesh) => {
			scene.add(object)
		})
	}

	addPosition(x: number, y: number, z: number) {
		this.objects.forEach((object: THREE.Mesh) => {
			object.position.x += x
			object.position.y += y
			object.position.z += z
		})
	}
	addRotation(y: number) {
		this.objects.forEach((object: THREE.Mesh) => {
			object.rotation.y += y
		})
	}

	setTimesheet(timesheet: Timesheet) {
		this.timesheet = timesheet
	}

	move(time: number) {
		if (this.timesheet) {
			const movement = this.timesheet.getMovement(time)
			movement.move(this.objects)
		}
	}
}

export { Character, ScenarioCharacter }
