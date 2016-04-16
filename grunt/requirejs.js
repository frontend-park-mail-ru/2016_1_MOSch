module.exports = {
	prod: {
		options: {
			baseUrl: './static_prod/tmp/js/',
			removeCombined: true,
			mainConfigFile: './static_prod/tmp/js/main.js',
			name: 'main',
			findNestedDependencies: true,
			out: 'static_prod/js/main.js',
			include: ['lib/require.js']
		}
	}
};
