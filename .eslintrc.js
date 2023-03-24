module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential", "@vue/prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		indent: [
			"warn",
			"tab",
			{
				MemberExpression: "off",
				SwitchCase: 1,
			},
		],
		"comma-dangle": ["error", "always-multiline"],
		"prettier/prettier": [
			"warn",
			{
				trailingComma: "es5",
				useTabs: true,
				tabWidth: 2,
			},
		],
	},
	parserOptions: {
		parser: "babel-eslint",
	},
};
