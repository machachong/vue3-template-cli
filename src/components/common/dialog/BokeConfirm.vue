<template>
	<el-dialog
		:title="title"
		:width="width"
		:model-value="dialogFormVisible"
		:append-to-body="true"
		align-center
		:close-on-click-modal="closeable"
		:show-close="closeable"
		@close="handleClose"
		:destroy-on-close="true"
	>
		<div class="my-confirm-content">
			<slot name="content"></slot>
		</div>
		<div class="m-t-16"></div>
		<template #footer v-if="cancleable || submitable">
			<span>
				<boke-button @click="handleCancel" v-if="cancleable">
					{{ cancelText }}
				</boke-button>
				<boke-button type="primary" @click="handleSubmit" v-if="submitable">
					{{ submitText }}
				</boke-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue"
import { getMinWidth } from "@/utils/tools"

export default defineComponent({
	name: "Confirm",
	props: {
		dialogFormVisible: {
			type: Boolean,
			default() {
				return false
			}
		},
		title: {
			type: String,
			default() {
				return "我是标题"
			}
		},
		width: {
			type: String,
			default() {
				if (getMinWidth()) {
					return "400px"
				} else {
					return "100%"
				}
			}
		},
		cancleable: {
			type: Boolean,
			default() {
				return true
			}
		},
		closeable: {
			type: Boolean,
			default() {
				return true
			}
		},
		submitable: {
			type: Boolean,
			default() {
				return true
			}
		},
		// 提交前的数据验证步骤
		beforeSubmit: {
			type: [Function, Promise],
			default() {
				return () => {
					return true
				}
			}
		},
		submitText: {
			type: String,
			default() {
				return "确定"
			}
		},
		cancelText: {
			type: String,
			default() {
				return "取消"
			}
		}
	},
	emits: ["submited", "cancel", "update:dialogFormVisible"],
	setup(props, ctx) {
		const state = reactive({})

		function handleSubmit() {
			if (props.beforeSubmit) {
				if (props.beforeSubmit instanceof Function && props.beforeSubmit() instanceof Promise) {
					return props.beforeSubmit().then(() => {
						ctx.emit("submited")
						ctx.emit("update:dialogFormVisible", false)
					})
				} else {
					if (!props.beforeSubmit()) {
						return
					}
				}
			}
			ctx.emit("submited")
			ctx.emit("update:dialogFormVisible", false)
		}

		function handleClose() {
			ctx.emit("update:dialogFormVisible", false)
		}

		function handleCancel() {
			ctx.emit("cancel")
			ctx.emit("update:dialogFormVisible", false)
		}

		return { ...toRefs(state), handleSubmit, handleClose, handleCancel }
	}
})
</script>

<style scoped>
.my-confirm-content {
	text-align: center;
}
</style>
