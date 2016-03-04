module.exports = {
	dev: {
		files: [{
			expand: true,
			cwd: 'public_html/css',
			src: ['*.css', '!*.min.css'],
			dest: 'public_html/css',
			ext: '.min.css'
		}]
	}
};
