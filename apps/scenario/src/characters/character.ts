import * as THREE from 'three'
import { Timesheet } from './timesheet'
import { Animation } from './animation'

class Character {
	gltf: THREE.Object3D | undefined
	parts: string[] = []
	objects: THREE.Mesh[] = []
	animation?: Animation
	timesheet?: Timesheet

	initialize(gltf: THREE.Object3D, parts: string[]) {
		this.gltf = gltf
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

	animate(time: number) {
		if (this.timesheet) {
			const animation = this.timesheet.getAnimation(time)
			animation.animate(this.objects)
		}
	}
}
export default Character
