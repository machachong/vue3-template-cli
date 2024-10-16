// 日期相关的通用函数

// 时间格式
const timeShortcuts = [
	{
		text: "今天",
		value: () => {
			const date = new Date()
			const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
			return [startOfDay, endOfDay]
		}
	},
	{
		text: "昨天",
		value: () => {
			const date = new Date()
			const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
			startOfDay.setTime(startOfDay.getTime() - 3600 * 1000 * 24 * 1)
			endOfDay.setTime(endOfDay.getTime() - 3600 * 1000 * 24 * 1)
			return [startOfDay, endOfDay]
		}
	},
	{
		text: "过去一周",
		value: () => {
			const date = new Date()
			const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
			startOfDay.setTime(startOfDay.getTime() - 3600 * 1000 * 24 * 7)
			endOfDay.setTime(endOfDay.getTime() - 3600 * 1000 * 24 * 1)
			return [startOfDay, endOfDay]
		}
	},
	{
		text: "过去一个月",
		value: () => {
			const date = new Date()
			const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
			startOfDay.setTime(startOfDay.getTime() - 3600 * 1000 * 24 * 30)
			endOfDay.setTime(endOfDay.getTime() - 3600 * 1000 * 24 * 1)
			return [startOfDay, endOfDay]
		}
	},
	{
		text: "过去三个月",
		value: () => {
			const date = new Date()
			const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
			startOfDay.setTime(startOfDay.getTime() - 3600 * 1000 * 24 * 90)
			endOfDay.setTime(endOfDay.getTime() - 3600 * 1000 * 24 * 1)
			return [startOfDay, endOfDay]
		}
	}
]

// 时间格式
const dateShortcuts = [
	{
		text: "今天",
		value: new Date()
	},
	{
		text: "昨天",
		value: () => {
			const day = new Date()
			day.setTime(day.getTime() - 3600 * 1000 * 24 * 1)
			return day
		}
	},
	{
		text: "3天前",
		value: () => {
			const day = new Date()
			day.setTime(day.getTime() - 3600 * 1000 * 24 * 3)
			return day
		}
	},
	{
		text: "7天前",
		value: () => {
			const day = new Date()
			day.setTime(day.getTime() - 3600 * 1000 * 24 * 7)
			return day
		}
	}
]

const dateFormat = function (fmt, date) {
	let ret
	if (!date) {
		return ""
	}
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	}
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"))
		}
	}
	return fmt
}

// 生成指定日期过去多少天的日期列表
const generateLastDays = (date, day_num) => {
	let result = []
	for (let i = 0; i <= day_num; i++) {
		let day = new Date(date)
		day.setDate(day.getDate() - i)
		result.unshift(day.toISOString().slice(0, 10)) // format date as "yyyy-mm-dd"
	}
	return result
}

// 将秒数转为时分秒
const convertSeconds = (seconds) => {
	let resp = ""
	if (seconds >= 1) {
		const hour = Math.floor(seconds / 3600)
		const minute = Math.floor((seconds % 3600) / 60)
		const second = Number((seconds % 60).toFixed(0))
		if (hour > 0) {
			resp += hour + "小时"
		}
		if (minute > 0) {
			resp += minute + "分"
		}
		if (second > 0) {
			resp += second + "秒"
		}
	} else if (seconds >= 0.001 && seconds < 1) {
		resp = Number((seconds * 1000).toFixed(0)) + "毫秒"
	} else if (seconds >= 0.000001 && seconds < 0.001) {
		resp = Number((seconds * 1000000).toFixed(0)) + "微秒"
	} else {
		resp = Number((seconds * 1000000000).toFixed(0)) + "纳秒"
	}
	return resp
}

export { generateLastDays, dateShortcuts, timeShortcuts, dateFormat, convertSeconds }
