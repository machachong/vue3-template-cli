import request from "./request"
export const get = (url, params, meta) => {
	return request({
		url,
		method: "GET",
		params,
		meta
	})
}
export const post = (url, params, meta) => {
	return request({
		url,
		method: "POST",
		data: params,
		meta
	})
}
