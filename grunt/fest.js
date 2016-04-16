module.exports = function (grunt, options) {
	return {
		options: {
			template: function (data) {
				return grunt.template.process(
					'define(function() { return <%= contents %>; });',
					{data: data}
				);
			}
		},
		dev: {
			files: [{
				expand: true,
				cwd: 'source/templates',
				src: '*.xml',
				dest: 'static_dev/js/tmpl'
			}]

		},
		prod: {
			files: [{
				expand: true,
				cwd: 'source/templates',
				src: '*.xml',
				dest: 'static_prod/tmp/js/tmpl'
			}]
		}
	}
};
