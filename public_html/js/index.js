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
	$page.html(mainTmpl({
		data: [1,2,3,4,5]
	}
	)); // Рендерим шаблон
	// Инициализируем обработчики событий
	$page.find('.js-scoreboard')
		.on('click', showScoreboardScreen);
	$page.find('.js-start-game').on('click', showGameScreen);
	document.title = "Заголовок Главного экрана";
}

function hideMainScreen() {
	// Деструктор экрана "Главный экран"
	// Удаляем установленные обработчики событий
	$page.find('.js-scoreboard')
		.off('click', showScoreboardScreen);
	$page.find('.js-start-game').off('click', showGameScreen);
	document.title = "Ушли с Главного экрана";
}

