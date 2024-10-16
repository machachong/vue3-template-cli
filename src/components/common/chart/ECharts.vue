<template>
	<div :id="chartId" :style="{ width: width, height: height }" ref="domRef"></div>
</template>

<script>
/*
    完全由外部注入options进行渲染的echarts组件
  */
import { defineComponent } from "vue"
import * as echarts from "echarts"

export default defineComponent({
	name: "ECharts",
	props: {
		chartId: {
			type: String,
			default() {
				return "ds-line"
			}
		},
		width: {
			type: String,
			default() {
				return "100%"
			}
		},
		height: {
			type: String,
			default() {
				return "100%"
			}
		},
		options: {
			type: Object,
			default() {
				return {}
			}
		},
		loading: {
			type: Boolean,
			default() {
				return false
			}
		},
		// 在数据刷新的时候是否需要清图
		needClear: Boolean,
		notMerge: {
			type: Boolean,
			default() {
				return false
			}
		} // 是否不跟之前设置的 option 进行合并，默认为 false，即合并
	},
	emits: ["clicked"],
	setup(props, ctx) {
		const myChart = shallowRef(null)

		function myChartInit() {
			if (myChart.value) {
				echarts.dispose(document.getElementById(props.chartId))
			}
			myChart.value = echarts.init(document.getElementById(props.chartId))
		}

		function myChartClear() {
			if (myChart.value) {
				myChart.value.clear()
			}
		}

		function myChartSet() {
			if (myChart.value) {
				const options = props.options
				myChart.value.setOption(options, props.notMerge)
				myChart.value.on("click", function (params) {
					ctx.emit("clicked", params)
				})
			}
		}

		function resize() {
			myChart.value?.resize?.()
		}

		function myChartDestroy() {
			myChart.value?.dispose?.()
		}

		function showLoading() {
			// 显示加载中
			myChart.value?.showLoading()
		}

		function hideLoading() {
			// 关闭加载中
			myChart.value?.hideLoading()
		}

		watch(
			() => props.loading,
			() => {
				if (props.loading) {
					showLoading()
				} else {
					hideLoading()
				}
			}
		)

		watch(
			() => props.options,
			() => {
				if (props.needClear) {
					myChartClear()
				}
				myChartSet()
			},
			{
				deep: true
			}
		)

		// 监控dom尺寸变化
		const domRef = ref(null)

		const resizeObserver = new ResizeObserver(() => {
			resize()
		})

		const onResize = () => {
			resizeObserver.observe(domRef.value)
		}

		const closeResize = () => {
			resizeObserver.disconnect()
		}

		onMounted(() => {
			myChartInit()
			myChartSet()
			onResize()
		})

		onUnmounted(() => {
			myChartDestroy()
			closeResize()
		})

		return { showLoading, hideLoading, resize, domRef }
	}
})
</script>

<style scoped></style>
