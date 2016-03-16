module.exports = {
	options: {
        browsers: ['last 3 versions', 'ie 8', 'ie 9']
    },
    dev: {
        expand: true,
        flatten: true,
        src: 'public_html/css/gen/*.css',
        dest: 'public_html/css/gen/pref/'
    }
};
