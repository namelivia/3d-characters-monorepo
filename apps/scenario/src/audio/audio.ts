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

	initialize = async (songs: string[]) => {
		songs.forEach(async (song) => {
			this.songs.push(await this.loadSong(song))
		})
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

	loadSong = async (song: string) => {
		const response = await fetch(song)
		const arrayBuffer = await response.arrayBuffer()
		const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
		const sourceNode = this.audioContext.createBufferSource()
		sourceNode.buffer = audioBuffer
		return {
			key: song,
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
