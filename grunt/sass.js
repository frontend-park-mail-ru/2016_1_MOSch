module.exports = {
	dev: {
		options: {
			outputStyle: 'nested',
			sourceMap: true
		},
		files: [{
			expand: true,
			cwd: 'public_html/css/scss',
			src: ['*.scss'],
			dest: 'public_html/css/gen',
			ext: '.css'
		}]
	}
};
