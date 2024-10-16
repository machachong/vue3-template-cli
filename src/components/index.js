import BokeTitle from "@/components/common/title/BokeTitle.vue"
import BokeCard from "@/components/common/card/BokeCard.vue"
import BokeButton from "@/components/common/button/BokeButton.vue"
import BokeDetail from "@/components/common/detail/BokeDetail.vue"
import BokeTextStatus from "@/components/common/button/BokeTextStatus"
import BokePopconfirm from "@/components/common/popconfirm/BokePopconfirm.vue"
import BokeDrawer from "@/components/common/drawer/BokeDrawer.vue"
import BokeEditor from "@/components/form/editor/MyEditor.vue"
import BokeMarkdown from "@/components/form/markdown/BokeMd.vue"
import BokeUpload from "@/components/form/upload/BokeUpload.vue"
import BokeSvg from "@/components/common/svg/BokeSvg.vue"
import BokeDialog from "@/components/common/dialog/BokeDialog.vue"
export default {
	install(Vue) {
		Vue.component("BokeTitle", BokeTitle)
		Vue.component("BokeCard", BokeCard)
		Vue.component("BokeButton", BokeButton)
		Vue.component("BokeEditor", BokeEditor)
		Vue.component("BokeMarkdown", BokeMarkdown)
		Vue.component("BokeDetail", BokeDetail)
		Vue.component("BokeUpload", BokeUpload)
		Vue.component("BokeTextStatus", BokeTextStatus)
		Vue.component("BokePopconfirm", BokePopconfirm)
		Vue.component("BokeSvg", BokeSvg)
		Vue.component("BokeDrawer", BokeDrawer)
		Vue.component("BokeDialog", BokeDialog)
	}
}
