define(function(
	require
) {

	var ScoresCollection = require('collections/scores');

	var getExample = function() {
		return new ScoresCollection([
			{ username: 'Andrew', 		rate: 72000, 	level: 100	},
			{ username: 'Sawoder', 		rate: 7851, 	level: 17	},
			{ username: 'Nick', 		rate: 5895, 	level: 0	},
			{ username: 'Alexey', 		rate: 9485, 	level: 22	},
			{ username: 'KOPTE3', 		rate: 5765, 	level: 0	},
			{ username: 'Frosich', 		rate: 71999 , 	level: 100	},
			{ username: 'Hero', 		rate: 9999, 	level: 1	},
			{ username: 'Devil Player', rate: 666, 		level: 0	},
			{ username: 'Pi', 			rate: 3, 		level: 14	},
			{ username: 'Voloshin LOL', rate: 9876, 	level: 7	}
		]);
	};

	return getExample;
});
