module.exports = {
	js_dev: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['js/**/*.js'],
				dest: 'static_dev'
			}
		]
	},
	js_prod: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['js/**/*.js', '!js/**/*.test.js'],
				dest: 'static_prod/tmp'
			}
		]
	},
	res_dev: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['res/**'],
				dest: 'static_dev'
			}
		]
	},
	res_prod: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['res/**'],
				dest: 'static_prod'
			}
		]
	},
	img_dev: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['img/**'],
				dest: 'static_dev'
			}
		]
	},
	img_prod: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['img/**'],
				dest: 'static_prod/tmp'
			}
		]
	},
	tests_dev: {
		files: [
			{
				expand: true,
				cwd: 'source/tests',
				src: ['**'],
				dest: 'static_dev/tests'
			}
		]
	},
	html_dev: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['indexDev.html'],
				dest: 'static_dev/',
				rename: function (dest, path) {
					return (dest + path).replace('Dev', '');
				}
			}
		]
	},
	json_prod: {
		files: [
			{
				expand: true,
				cwd: 'source',
				src: ['manifest.json'],
				dest: 'static_prod/'				
			}
		]
	}
};
