module.exports = {
	fest: {
		files: ['source/templates/*.xml'],
		tasks: ['fest:dev'],
		options: {
			interrupt: true
		}
	},
	server: {
		files: [
			'static_dev/**'
		],
		options: {
			livereload: true
		}
	},
	sass: {
		files: ['source/css/scss/*.scss'],
		tasks: ['sass:dev', 'autoprefixer:dev', 'concat:css_dev', 'cssmin:dev']
	},
	img: {
		files: ['source/img/**'],
		tasks: ['copy:img_dev']
	},
	res: {
		files: ['source/res/**'],
		tasks: ['copy:res_dev']
	},
	js: {
		files: ['source/js/**'],
		tasks: ['copy:js_dev']
	},
	tests: {
		files: ['source/tests/**'],
		tasks: ['copy:tests_dev']
	}
};
