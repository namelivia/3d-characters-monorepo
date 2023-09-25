export type ResourceCatalog = {
	music: string[]
	models: string[]
	characters: string[]
}

class ResourceList {
	initialize = async () => {
		const resources = await fetch('./resources.json')
		return resources.json()
	}
}

export default ResourceList
