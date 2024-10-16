import { get } from "@/api/service/index"
import { fetchData } from "@/utils/tools/index"
const path = {
	fullLog: "/report/qbi/access_log/"
}

export const getSessionFullLogApi = (params) => {
	return fetchData(get, path.fullLog, params)
}
