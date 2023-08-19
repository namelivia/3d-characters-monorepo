import { MovementList, Movement } from './movement'

type MovementMap = {
	[key: number]: string
}

export type MovementMapTotal = {
	index: MovementMap
	length: number
}

export class Timesheet {
	movementIndex: MovementMapTotal = {
		index: {
			0: 'spin_left',
			100: 'move_down',
			200: 'spin_right',
			300: 'move_up',
			400: 'spin_left',
			500: 'move_left',
			600: 'spin_right',
			700: 'move_right',
		},
		length: 800,
	}

	setMovementMap = (movementIndex: MovementMapTotal) => {
		this.movementIndex = movementIndex
	}

	getMovement = (time: number): Movement => {
		const relative_time = time % this.movementIndex.length
		const keys = Object.keys(this.movementIndex.index).map((x) => Number(x))
		const selectedKey = Math.max(...keys.filter((x) => x <= relative_time))
		return MovementList[this.movementIndex.index[selectedKey]]
	}
}
