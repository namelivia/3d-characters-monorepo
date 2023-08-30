import { loadGLTF } from 'common'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type Resources = {
	models3d: string[]
}

type Model3d = {
	gltf: GLTF
	key: string
}

type Song = {
	data: ArrayBuffer
	key: string
}

//TODO: Implement a way to get rid of things that are not necessary anymore.

class ResourceManager {
	models3d: Model3d[]
	songs: Song[]

	constructor() {
		this.models3d = []
		this.songs = []
	}

	load = async (resources: Resources) => {
		//TODO: Only iterate the models that are not
		// already loaded.
		for (const model of resources.models3d) {
			this.models3d.push({
				gltf: await loadGLTF(model),
				key: model,
			})
		}
	}

	loadSong = async (song: string) => {
		// Fetch the song and turn it into array buffer
		const response = await fetch(song)
		return await response.arrayBuffer()
	}

	loadSongs = (songs: string[]) => {
		//TODO: Only iterate the songs that are not
		// already loaded.
		songs.forEach(async (song) => {
			this.songs.push({
				key: song,
				data: await this.loadSong(song),
			})
		})
		console.log(this.songs)
	}

	getSong = (key: string): ArrayBuffer => {
		const song = this.songs.find((song) => song.key === key)
		if (song) {
			return song.data
		}
		throw Error(`Could not retrieve song with key ${key}`)
	}

	getModel3d = (key: string): GLTF => {
		const model = this.models3d.find((model3d) => model3d.key === key)
		if (model) {
			return model.gltf
		}
		throw Error(`Could not retrieve 3d model with key ${key}`)
	}
}

export default ResourceManager
