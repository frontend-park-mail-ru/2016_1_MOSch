module.exports = {
	options: {
		optimizationLevel: 5
	},
	prod: {
		files: [{
			expand: true,
			cwd: 'static_prod/tmp/img',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'static_prod/img'
		}]
	}
};
