export const tablColumns = [
	{
		label: "操作人",
		prop: "nick",
		align: "center",
		width: 160
	},
	{
		label: "部门",
		prop: "department",
		align: "center",
		width: 160
	},
	{
		label: "访问账号",
		prop: "account_name",
		align: "center",
		width: 160
	},
	{
		label: "操作类型",
		prop: "operation_type",
		align: "center",
		width: 150
	},
	{
		label: "资源类型",
		prop: "target_type",
		align: "center",
		width: 150
	},
	{
		label: "资源名称",
		prop: "target_name",
		align: "center"
		// width: 90,
	},
	{
		label: "空间名称",
		prop: "workspace_name",
		align: "center"
		// width:100,
	},
	{
		label: "访问时间",
		prop: "gmt_create",
		align: "center",
		width: 230,
		sortable: "custom"
	}
]

export const operationOptions = [
	{
		label: "全部",
		prop: ""
	},
	{
		label: "查看",
		prop: "VIEW"
	},
	{
		label: "导出",
		prop: "EXPORT"
	},
	{
		label: "下载",
		prop: "DOWNLOAD"
	}
]

export const targetOptions = [
	{
		label: "仪表板",
		prop: "DASHBOARD"
	},
	{
		label: "数据门户",
		prop: "DATAPRODUCT"
	},
	{
		label: "电子表格",
		prop: "REPORT"
	},
	{
		label: "自助取数",
		prop: "DASHBOARDOFFLINEQUERY"
	}
]
