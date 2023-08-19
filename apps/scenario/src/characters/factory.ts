import { ScenarioCharacter } from './character'
import { Timesheet } from './timesheet'
import { loadCharacter, loadTimesheet } from './loader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

export const newCharacter = async (
	gltf: GLTF,
	model: string,
	movement: string,
	x: number,
	y: number,
	z: number
) => {
	// For each character we need to copy the gltf scene
	const gltfClone = SkeletonUtils.clone(gltf.scene)
	const character = new ScenarioCharacter(gltfClone, await loadCharacter(model))
	character.addPosition(x, y, z)
	const timesheet = new Timesheet()
	timesheet.setMovementMap(await loadTimesheet(movement))
	character.setTimesheet(timesheet)
	return character
}
