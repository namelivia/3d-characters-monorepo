import { ScenarioCharacter } from './character'
import { Timesheet } from './timesheet'
import { loadCharacter } from './loader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import { AnimationMap, MovementMap } from 'common'

export const newCharacter = async (
	gltf: GLTF,
	model: string,
	movement: MovementMap,
	animation: AnimationMap,
	x: number,
	y: number,
	z: number
) => {
	// For each character we need to copy the gltf scene
	const gltfSceneClone = SkeletonUtils.clone(gltf.scene)
	const character = new ScenarioCharacter(
		gltfSceneClone,
		gltf.animations,
		await loadCharacter(model)
	)
	character.addPosition(x, y, z)
	const timesheet = new Timesheet()
	timesheet.setMovementMap(movement)
	timesheet.setAnimationMap(animation)
	character.setTimesheet(timesheet)
	return character
}
