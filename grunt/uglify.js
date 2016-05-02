module.exports = function (grunt, options) {
	return {
		options: {
			ASCIIOnly: true,
			preserveComments: false,
			screwIE8: true
		},
		prod: {
			files: [{
				expand: true,
				cwd: 'source/js',
				src: ['service-worker.js'],
				dest: 'static_prod/js'
			}]
		}
	}
};
