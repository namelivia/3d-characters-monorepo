export default class Audio {
	audioContext: AudioContext
	songs: AudioBufferSourceNode[] = []

	constructor() {
		this.audioContext = new AudioContext()
	}

	initialize = async (songs: string[]) => {
		songs.forEach(async (song) => {
			this.songs.push(await this.loadSong(song))
		})
	}

	startSong = (index: number) => {
		this.songs[index].start()
	}

	unsetAllSongs = () => {
		this.songs.forEach((song) => {
			song.disconnect()
		})
	}

	setSong = (index: number) => {
		this.unsetAllSongs()
		this.songs[index].connect(this.audioContext.destination)
	}

	loadSong = async (song: string) => {
		const response = await fetch(song)
		const arrayBuffer = await response.arrayBuffer()
		const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
		const sourceNode = this.audioContext.createBufferSource()
		sourceNode.buffer = audioBuffer
		return sourceNode
	}

	allow = () => {
		this.audioContext.resume()
	}

	disallow = () => {
		this.audioContext.suspend()
	}
}
