import * as THREE from 'three'
export class Animation {
	animate = (objects: THREE.Mesh[]) => {
		console.log('Animation not implemented')
		console.log(objects)
	}
}

export class SpinLeft extends Animation {
	addRotation(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.rotation.y += y
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addRotation(objects, 0.01)
	}
}

export class SpinRight extends Animation {
	addRotation(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.rotation.y -= y
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addRotation(objects, 0.01)
	}
}

export class MoveBack extends Animation {
	addZ(objects: THREE.Mesh[], z: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.z -= z
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addZ(objects, 0.01)
	}
}

export class MoveFront extends Animation {
	addZ(objects: THREE.Mesh[], z: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.z += z
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addZ(objects, 0.01)
	}
}

export class MoveLeft extends Animation {
	addX(objects: THREE.Mesh[], x: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.x += x
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addX(objects, 0.01)
	}
}

export class MoveRight extends Animation {
	addX(objects: THREE.Mesh[], x: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.x -= x
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addX(objects, 0.01)
	}
}

export class MoveUp extends Animation {
	addY(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.y -= y
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addY(objects, 0.01)
	}
}

export class MoveDown extends Animation {
	addY(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.y += y
		})
	}

	animate = (objects: THREE.Mesh[]) => {
		this.addY(objects, 0.01)
	}
}

type AnimationIndex = {
	[key: string]: Animation
}

export const AnimationList: AnimationIndex = {
	spin_left: new SpinLeft(),
	spin_right: new SpinRight(),
	move_up: new MoveUp(),
	move_down: new MoveDown(),
	move_left: new MoveLeft(),
	move_right: new MoveRight(),
	move_front: new MoveFront(),
	move_back: new MoveBack(),
}
