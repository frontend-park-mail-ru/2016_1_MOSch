module.exports = {
	// запуск watcher'a, который следит за изенениями файлов  templates/*.xml
	// и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
	fest: {
		files: [
			'templates/*.xml'
		],
		tasks: [
			'fest'
		],
		options: {
			interrupt: true,
			atBegin: true
		}
	},
	server: {
		files: [
			'public_html/js/**/*.js',
			'public_html/css/**/*.css'
		],
		options: {
			livereload: true
		}
	}
};
