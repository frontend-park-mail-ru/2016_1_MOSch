module.exports = {
	options: {
		browsers: ['last 3 versions', 'ie 9']
	},
	dev: {
		expand: true,
		flatten: true,
		src: 'static_dev/tmp/css/from_scss/*.css',
		dest: 'static_dev/tmp/css/from_autoprefixer'
	},
	prod: {
		expand: true,
		flatten: true,
		src: 'static_prod/tmp/css/from_scss/*.css',
		dest: 'static_prod/tmp/css/from_autoprefixer'
	}
};
