let plugins = {
	autoprefixer: {}
};
switch (process.env.APP_NAME) {

	case 'vant_study':
		plugins = {
			...plugins,
			'autoprefixer':{
				browsers: ['Android >= 4.0', 'iOS >= 7']
			},
			'postcss-px-to-viewport': {
				viewportWidth: 375,
				exclude: /(element-ui)|(mint-ui)|(Rules)|(iview)/i
			}
		};
		break;
	default:
		break;
}

module.exports = {
	plugins
};
