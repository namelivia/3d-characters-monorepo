type Song = {
	key: string
	audio: AudioBufferSourceNode
}

export default class Audio {
	audioContext: AudioContext
	songs: Song[] = []

	constructor() {
		this.audioContext = new AudioContext()
	}

	initialize = async (songs: { key: string; data: ArrayBuffer }[]) => {
		for (const song of songs) {
			this.songs.push(await this.prepareSong(song.key, song.data))
		}
	}

	startSong = (key: string) => {
		const song = this.findSong(key)
		song.audio.start()
	}

	unsetAllSongs = () => {
		this.songs.forEach((song) => {
			song.audio.disconnect()
		})
	}

	findSong = (key: string) => {
		const song = this.songs.find((song) => song.key === key)
		if (song) {
			return song
		}
		throw Error(`Song ${key} not found`)
	}

	setSong = (key: string) => {
		this.unsetAllSongs()
		const song = this.findSong(key)
		song.audio.connect(this.audioContext.destination)
	}

	prepareSong = async (key: string, data: ArrayBuffer) => {
		//TODO: Is this needed in advance? or is it ok doing it when playing?
		const audioBuffer = await this.audioContext.decodeAudioData(data)
		const sourceNode = this.audioContext.createBufferSource()
		sourceNode.buffer = audioBuffer
		return {
			key: key,
			audio: sourceNode,
		}
	}

	allow = () => {
		this.audioContext.resume()
	}

	disallow = () => {
		this.audioContext.suspend()
	}
}
