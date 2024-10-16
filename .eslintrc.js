module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"./.eslintrc-auto-import.json",
		"prettier",// 保持在最后
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"vue/multi-word-component-names":"off", // 忽略组件命名规则
		"indent": [
			"error",
			"tab"
		],
		// "linebreak-style": [
		// 	"error",
		// 	"windows"
		// ],
		"quotes": [
			"error",
		],
		"semi": [
			"error",
			"never"
		]
	}
}
