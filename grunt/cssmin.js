module.exports = {
	dev: {
		files: [{
			expand: true,
			cwd: 'static_dev/tmp/css',
			src: ['*.css', '!*.min.css'],
			dest: 'static_dev/css',
			ext: '.css'
		}]
	},
	prod: {
		files: [{
			expand: true,
			cwd: 'static_prod/tmp/css',
			src: ['*.css', '!*.min.css'],
			dest: 'static_prod/css',
			ext: '.css'
		}]
	}
};
