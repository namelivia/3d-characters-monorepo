import copy from 'rollup-plugin-copy'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'esm',
		sourcemap: true,
	},
	plugins: [
		typescript(),
		resolve(),
		commonjs(),
		copy({
			targets: [{ src: 'static/*', dest: 'dist' }],
		}),
		sourcemaps(),
	],
}
