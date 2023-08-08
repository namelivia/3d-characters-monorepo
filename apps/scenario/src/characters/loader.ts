export const loadCharacter = async (key: string) => {
	const response = await fetch(`./characters/${key}.json`)
	const json = await response.json()
	return json
}

export const loadTimesheet = async (key: string) => {
	const response = await fetch(`./animations/${key}.json`)
	const json = await response.json()
	return json
}
