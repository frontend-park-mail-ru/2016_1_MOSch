module.exports = {
	css_dev: {
		src: ['static_dev/tmp/css/from_autoprefixer/*.css'],
		dest: 'static_dev/tmp/css/main.css'
	},
	css_prod: {
		src: ['static_prod/tmp/css/from_autoprefixer/*.css'],
		dest: 'static_prod/tmp/css/main.css'
	}
};
