/* eslint-disable no-alert */
// Disables no-alert for the rest of the file
const ACE_VERSION = "1.4.12"
let ace
const setCompleteData = function (data) {
	var langTools = ace.require("ace/ext/language_tools")
	langTools.addCompleter({
		getCompletions: function (editor, session, pos, prefix, callback) {
			// if (prefix.length === 0) {
			//   return callback(null, []);
			// } else {
			//   return callback(null, data);
			// }
			return callback(null, data)
		}
	})
}

const setTablesCompleteData = function (result) {
	const meta = "test_db"
	var tables = []
	for (var i = 0; i < result.length; i++) {
		tables.push({
			name: result[i], // 名称
			value: result[i], // 值
			caption: result[i], // 字幕，也就是展示在列表中的内容
			meta: meta, // 展示类型
			score: 100
		})

	}
	setCompleteData(tables)
}

const getPythonEditor = function (id) {
	const editor = ace.edit(id)
	ace.config.set("basePath", `https://lib.baomitu.com/ace/${ACE_VERSION}`)
	var theme = "chrome"
	var language = "python"
	editor.setTheme("ace/theme/" + theme)
	editor.session.setMode("ace/mode/" + language)
	editor.session.setUseWorker(false)
	editor.session.setTabSize(4)
	editor.setFontSize(13)

	ace.require("ace/ext/language_tools")
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	})

	return editor
}

const getSqlEditor = function (id) {
	const editor = ace.edit(id)
	ace.config.set("basePath", `https://lib.baomitu.com/ace/${ACE_VERSION}`)
	var theme = "sqlserver"
	var language = "sql"
	editor.setTheme("ace/theme/" + theme)
	editor.session.setMode("ace/mode/" + language)
	editor.setFontSize(13)

	ace.require("ace/ext/language_tools")
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	})

	return editor
}

const getShellEditor = function (id) {
	const editor = ace.edit(id)
	ace.config.set("basePath", `https://lib.baomitu.com/ace/${ACE_VERSION}`)
	var theme = "chrome"
	var language = "sh"
	editor.setTheme("ace/theme/" + theme)
	editor.session.setMode("ace/mode/" + language)
	editor.setFontSize(13)
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	})

	return editor
}

const getJsonEditor = function (id) {
	const editor = ace.edit(id)
	ace.config.set("basePath", `https://lib.baomitu.com/ace/${ACE_VERSION}`)
	var theme = "github"
	var language = "json"
	editor.setTheme("ace/theme/" + theme)
	editor.session.setMode("ace/mode/" + language)
	editor.setFontSize(13)
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true,
		tabSize: 2,
		showPrintMargin: true,
	})

	return editor
}
// import "ace-builds/src-min-noconflict/mode-json5"
const getEditor = function (id, mode = "sql") {
	// 根据mode返回编辑器
	if (mode == "sql") {
		return getSqlEditor(id)
	} else if (mode == "python") {
		return getPythonEditor(id)
	} else if (mode == "shell") {
		return getShellEditor(id)
	} else if(mode === "json"){
		return getJsonEditor(id)
	}
}

export { getEditor, setTablesCompleteData }