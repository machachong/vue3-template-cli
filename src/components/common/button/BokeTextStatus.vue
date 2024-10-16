<template>
	<div
		class="boke-status-text"
		:class="{
			point: mode === 'point',
			text: mode === 'text',
			fail: status === 'fail',
			warning: status === 'warning',
			open: status === 'open',
			default: status === 'default'
		}"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "BokeTextStatus",
	props: {
		mode: {
			type: String,
			default: "point" // poinst text
		},
		status: {
			type: String,
			default: "success" // success, fail, warning, open, default
		}
	},
	setup() {}
}
</script>

<style scoped lang="scss">
.boke-status-text {
	color: var(--boke-color-text-content);
	&.point {
		position: relative;
		padding-left: 20px;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 8px;
			height: 8px;
			border-radius: 4px;
			background-color: var(--boke-color-success);
		}
	}
	&.fail {
		&::before {
			background-color: var(--boke-color-fail);
		}
	}
	&.warning {
		&::before {
			background-color: var(--boke-color-warning);
		}
	}
	&.default {
		&::before {
			background-color: var(--boke-color-text-describe);
		}
	}
	&.text {
		color: var(--boke-color-success);
		&.fail {
			color: var(--boke-color-fail);
		}
		&.warning {
			color: var(--boke-color-warning);
		}
		&.open {
			color: var(--boke-color-open);
		}
		&.default {
			color: var(--boke-color-text-describe);
		}
	}
}
</style>
