import { debounce } from "@/utils/tools"
import { ElMessage, ElMessageBox } from "element-plus"
export function cleanErrorMessage(message) {
	const pat = /On line [0-9]+ -/i
	while (pat.test(message)) {
		message = message.replace(pat, "")
	}
	return message
}
export const message = {
	success: debounce((message) => {
		// 加入防抖，防止信息重复
		ElMessage({
			message: message,
			showClose: true,
			type: "success",
			grouping: true,
			center: true
		})
	}, 50),
	error: debounce(
		(message) => {
			// 加入防抖，防止反复报错
			message = cleanErrorMessage(message)
			ElMessage({
				message: message,
				showClose: true,
				type: "error",
				grouping: true,
				duration: 6000,
				center: true
			})
		},
		500,
		true
	),
	warning(message) {
		ElMessage({
			message: message,
			showClose: true,
			type: "warning",
			grouping: true,
			center: true
		})
	},
	info(message) {
		ElMessage({
			message: message,
			showClose: true,
			grouping: true,
			center: true
		})
	}
}
// 二次确认弹框
export const confirm = (content) => {
	return ElMessageBox.confirm(content, {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		showClose: false,
		type: "warning",
		draggable: true,
		closeOnPressEscape: false,
		customClass: "boke-confirm",
		appendTo: "body"
	})
}
