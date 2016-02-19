function showScoreboardScreen() {
	// TODO
}
function hideScoreboardScreen() {
	// TODO
}

function showGameScreen() {
	// TODO
}
function hideGameScreen() {
	// TODO
}

function showLoginScreen() {
	// TODO
}
function hideLoginScreen() {
	// TODO
}

function showMainScreen() {
	// Конструктор экрана "Гравный экран"
	$page.html(mainTmpl()); // Рендерим шаблон
	// Инициализируем обработчики событий
	$page.find('.js-scoreboard')
		.on('click', showScoreboardScreen);
	$page.find('.js-start-game').on('click', showGameScreen);
}

function hideMainScreen() {
	// Деструктор экрана "Главный экран"
	// Удаляем установленные обработчики событий
	$page.find('.js-scoreboard')
		.off('click', showScoreboardScreen);
	$page.find('.js-start-game').off('click', showGameScreen);
}

