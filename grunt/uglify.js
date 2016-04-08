module.exports = function (grunt, options) {
	return {
		options: {
			banner: '/*! \u00A9 Created by MOSch-team\n' +
			'  <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
			ASCIIOnly: true,
			preserveComments: false,
			screwIE8: true,
			mangle: {
				except: ['require']
			}
		},
		prod: {
			files: [{
				expand: true,
				cwd: 'static_prod/tmp/js',
				src: ['**/*.js', '!models/gamescript.js'],
				dest: 'static_prod/js'
			}]
		}
	}
};
