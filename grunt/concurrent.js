module.exports = {
	// Настройки задач
	options: {
		logConcurrentOutput: true
	},
	// Очищаем директории
	target1: [
		'clean'
	],
	// Запуск сервера
	target2: [
		'watch',
		'shell:dev'
	]
};
