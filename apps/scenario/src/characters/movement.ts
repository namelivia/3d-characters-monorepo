import * as THREE from 'three'
export class Movement {
	move = (objects: THREE.Mesh[]) => {
		console.log('Movement not implemented')
		console.log(objects)
	}
}

export class SpinLeft extends Movement {
	addRotation(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.rotation.y += y
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addRotation(objects, 0.01)
	}
}

export class SpinRight extends Movement {
	addRotation(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.rotation.y -= y
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addRotation(objects, 0.01)
	}
}

export class MoveBack extends Movement {
	addZ(objects: THREE.Mesh[], z: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.z -= z
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addZ(objects, 0.01)
	}
}

export class MoveFront extends Movement {
	addZ(objects: THREE.Mesh[], z: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.z += z
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addZ(objects, 0.01)
	}
}

export class MoveLeft extends Movement {
	addX(objects: THREE.Mesh[], x: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.x += x
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addX(objects, 0.01)
	}
}

export class MoveRight extends Movement {
	addX(objects: THREE.Mesh[], x: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.x -= x
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addX(objects, 0.01)
	}
}

export class MoveUp extends Movement {
	addY(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.y -= y
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addY(objects, 0.01)
	}
}

export class MoveDown extends Movement {
	addY(objects: THREE.Mesh[], y: number) {
		objects.forEach((object: THREE.Mesh) => {
			object.position.y += y
		})
	}

	move = (objects: THREE.Mesh[]) => {
		this.addY(objects, 0.01)
	}
}

type MovementIndex = {
	[key: string]: Movement
}

export const MovementList: MovementIndex = {
	spin_left: new SpinLeft(),
	spin_right: new SpinRight(),
	move_up: new MoveUp(),
	move_down: new MoveDown(),
	move_left: new MoveLeft(),
	move_right: new MoveRight(),
	move_front: new MoveFront(),
	move_back: new MoveBack(),
}
