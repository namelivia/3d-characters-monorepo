export const loadCharacter = async (key: string) => {
	const response = await fetch(`./characters/${key}.json`)
	const json = await response.json()
	return json
}

export const loadMovementTimesheet = async (key: string) => {
	const response = await fetch(`./movements/${key}.json`)
	const json = await response.json()
	return json
}

export const loadAnimationTimesheet = async (key: string) => {
	const response = await fetch(`./animations/${key}.json`)
	const json = await response.json()
	return json
}
