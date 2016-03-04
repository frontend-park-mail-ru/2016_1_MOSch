define([ 'backbone' ], function(Backbone) {

	var func_allpage_update = function() {
		var x = $(window).width();
		var miny = (((+x)*9)/19);
		miny = miny < 640 ? 640 : miny;
		$('body').css("min-height", miny + "px");
	}

	return func_allpage_update;

});


// $(document).ready(func_allpage_update);
// $(window).resize(func_allpage_update);
