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
	data: AudioBuffer
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
			try {
				this.models3d.push({
					gltf: await loadGLTF(model),
					key: model,
				})
			} catch (error) {
				console.error(`Error loading model ${model}:`, error)
			}
		}
	}

	loadSong = async (song: string) => {
		// Fetch the song and turn it into array buffer
		const response = await fetch(song)
		return await response.arrayBuffer()
	}

	loadSongs = async (songs: string[]) => {
		// TODO: Only iterate the songs that are not
		// already loaded.
		for (const song of songs) {
			try {
				const data = await this.loadSong(song)
				const context = new AudioContext()
				const audioBuffer = await context.decodeAudioData(data)
				this.songs.push({
					key: song,
					data: audioBuffer,
				})
			} catch (error) {
				console.error(`Error loading song ${song}:`, error)
			}
		}
	}

	getSong = (key: string): AudioBuffer => {
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
