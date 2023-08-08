import { AnimationList, Animation } from './animation'

type AnimationMap = {
	[key: number]: string
}

export type AnimationMapTotal = {
	index: AnimationMap
	length: number
}

export class Timesheet {
	animationIndex: AnimationMapTotal = {
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

	setAnimationMap = (animationIndex: AnimationMapTotal) => {
		this.animationIndex = animationIndex
	}

	getAnimation = (time: number): Animation => {
		const relative_time = time % this.animationIndex.length
		const keys = Object.keys(this.animationIndex.index).map((x) => Number(x))
		const selectedKey = Math.max(...keys.filter((x) => x <= relative_time))
		return AnimationList[this.animationIndex.index[selectedKey]]
	}
}
