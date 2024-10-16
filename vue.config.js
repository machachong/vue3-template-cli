const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
const path = require("path")
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: "/",
	devServer: {
		host: "0.0.0.0",
		port: 8080
	},
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			scss: {
				// 这里的选项会传递给 css-loader 这里通常引入scss全局变量
				additionalData: "@import '@/assets/style/variable.scss';"
				// additionalData: `@import "@/assets/style/base.scss";`
			}
		}
	},
	configureWebpack: {
		resolve: {
			fallback: {
				path: require.resolve("path-browserify")
			}
		},
		plugins: [
			AutoImport({
				imports: ["vue", "vue-router", "pinia"],
				resolvers: [ElementPlusResolver()],
				dts: "./auto-imports.d.ts",
				eslintrc: {
					enabled: true,
					filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
					globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
				}
			}),
			Components({
				resolvers: [ElementPlusResolver()],
				dts: true
			}),
			new NodePolyfillPlugin()
		]
		// 环境判断
	},
	chainWebpack: (config) => {
		// 内置的svg处理排除指定目录下的文件
		config.module.rule("svg").exclude.add(resolve("src/assets/svg/svg_icon")).end()
		config.module
			.rule("svg-sprite-loader")
			.test(/\.svg$/)
			.include.add(resolve("src/assets/svg/svg_icon"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]"
			})
	}
	// configureWebpack: (config) => {
	//   if (process.env.NODE_ENV === 'production') {
	//     config.optimization.minimizer[0].options.minimizer.options.compress.drop_console = true;
	//   }
	// },
}
