module.exports = {
	options: {
		outputStyle: 'nested',
		sourceMap: false
	},
	dev: {
		files: [{
			expand: true,
			cwd: 'source/css/scss',
			src: ['*.scss'],
			dest: 'static_dev/tmp/css/from_scss',
			ext: '.css'
		}]
	},
	prod: {
		files: [{
			expand: true,
			cwd: 'source/css/scss',
			src: ['*.scss'],
			dest: 'static_prod/tmp/css/from_scss',
			ext: '.css'
		}]
	}
};
