module.exports = function (grunt) {

	grunt.initConfig({

		shell: {
			// запуск сервера через скрипт shell'a https://www.npmjs.com/package/grunt-shell
			options: {
				stdout: true,
				stderr: true
			},
			dev: {
				command: 'npm start' /* запуск сервера */
			}
		},

		watch: {
			// запуск watcher'a, который следит за изенениями файлов  templates/*.xml
			// и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
			fest: {
				files: ['templates/*.xml'],
				tasks: ['fest'],
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
		},
		
		concurrent: {
			// одновременный запуска shell'a и watcher'a https://www.npmjs.com/package/grunt-concurrent
			target: ['watch', 'shell'],
			options: {
				logConcurrentOutput: true /* Вывод логов */
			}
		},

		fest: {
			templates: {
				files: [{
					expand: true,
					cwd: 'templates',
					src: '*.xml',
					dest: 'public_html/js/tmpl'
				}],
				options: {
					template: function (data) {
						return grunt.template.process(
							'var <%= name %>Tmpl = <%= contents %> ;',
							{data: data}
						);
					}
				}
			}
		},
		qunit: {
			all: ['./public_html/tests/index.html']
		}
	});

	// подключить все необходимые модули
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');

	// алиас для команды test
	grunt.registerTask('test', ['qunit:all']);
	// алиас для команды grunt
	grunt.registerTask('default', ['concurrent']);
};
