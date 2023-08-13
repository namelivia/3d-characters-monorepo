import { loadGLTF } from './gltf/loader'
import { loadCharacter, loadTimesheet } from './characters/loader'
import Character from './characters/character'
import { Timesheet } from './characters/timesheet'
import World from './world/world'

const newCharacter = async (
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

const main = async () => {
	const world = new World()
	world.initialize()
	const gltf = await loadGLTF()

	world.addCharacter(
		await newCharacter(gltf, 'naked_magician', 'animation1', -5, 0, 0)
	)
	world.addCharacter(await newCharacter(gltf, 'dude', 'animation2', 0, 0, 0))
	world.addCharacter(
		await newCharacter(gltf, 'naked_hipster', 'animation3', 5, 0, 0)
	)
	world.addCharacter(
		await newCharacter(gltf, 'one_punch', 'animation4', 0, 0, 5)
	)
	world.addCharacter(await newCharacter(gltf, 'weirdo', 'animation5', 0, 0, -5))

	world.animate()
}

main()
