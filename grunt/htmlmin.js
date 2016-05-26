module.exports = {
	prod: {
		options: {
			removeComments: true,
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true
		},
		files: {
			'static_prod/index.html': 'source/index.html'
		}
	}
};
