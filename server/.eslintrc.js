module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
	rules: {
		'node/no-unsupported-features/es-syntax': 'off',
		'node/no-extraneous-import': 'off',
		'no-underscore-dangle': 'off',
		'consistent-return': 'off',
		'no-console': 'off'
	}
}
