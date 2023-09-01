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

	addSongs = async (songs: { key: string; data: AudioBuffer }[]) => {
		for (const song of songs) {
			this.songs.push(await this.addSong(song.key, song.data))
		}
	}

	startSong = (key: string) => {
		const song = this.findSong(key)
		try {
			song.audio.start()
		} catch (error) {
			// This happens when the song is already playing.
			// Can be ignored.
			if (error instanceof DOMException && error.name === 'InvalidStateError') {
				return
			}
		}
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

	addSong = async (key: string, data: AudioBuffer) => {
		const sourceNode = this.audioContext.createBufferSource()
		sourceNode.buffer = data
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
