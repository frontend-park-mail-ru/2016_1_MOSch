module.exports = {
	dev: {
		options: {
			create: ["static_dev", "static_dev/css", "static_dev/js", "static_dev/res", "static_dev/img", "static_dev/tests", "static_dev/tmp"]
		}
	},
	prod: {
		options: {
			create: ["static_prod", "static_prod/css", "static_prod/js", "static_prod/res", "static_prod/img", "static_prod/tmp"]
		}
	}
};
