import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { ConfigEnv, defineConfig, loadEnv, type PluginOption, UserConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 引入css全局变量，变量在main.ts中无法直接引用
					additionalData: `@import "@/styles/color.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			port: 3866,
			open: true,
			cors: true,
			// 跨域代理配置
			proxy: {
				"^/api": {
					// target: "http://localhost:9093", // dev
					target: "http://96.44.169.103:9093", // dev
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: "十年一梦 向光而行"
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),
			legacy({
				polyfills: ["es.promise.finally", "es/map", "es/set"],
				targets: ["defaults", "not IE 11"],
				modernPolyfills: ["es.promise.finally"]
			})
		],
		esbuild: {
			pure: ["console.log", "debugger"]
		},
		build: {
			sourcemap: process.env.NODE_ENV !== "production",
			target: "modules", // 默认 "modules"
			outDir: "dist",
			minify: "esbuild",
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				input: {
					index: resolve(__dirname, "index.html")
				},
				output: {
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
