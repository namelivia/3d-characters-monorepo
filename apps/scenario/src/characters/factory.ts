import Character from './character'
import { Timesheet } from './timesheet'
import { loadCharacter, loadTimesheet } from './loader'

export const newCharacter = async (
	gltf: { [name: string]: THREE.Mesh },
	model: string,
	animation: string,
	x: number,
	y: number,
	z: number
) => {
	const character = new Character()
	character.initialize(gltf, await loadCharacter(model))
	character.addPosition(x, y, z)
	const timesheet = new Timesheet()
	timesheet.setAnimationMap(await loadTimesheet(animation))
	character.setTimesheet(timesheet)
	return character
}
