let plugins = {
	autoprefixer: {}
};
switch (process.env.APP_NAME) {

	case 'iam2r':
		plugins = {
			...plugins,
			'autoprefixer':{

			},
			'postcss-px-to-viewport': {
				viewportWidth: 375,
			}
		};
		break;
	default:
		break;
}

module.exports = {
	plugins
};
