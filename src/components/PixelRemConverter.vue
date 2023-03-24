<template>
	<div>
		<h2 class="title is-3">Pixel Rem Converter</h2>
		<div class="columns">
			<div class="column">
				<p>Root Font Size (in px)</p>
			</div>
			<div class="column">
				<input class="input" type="text" placeholder="16" v-model="rootFont" />
			</div>
		</div>
		<button class="button" @click="run('encode')">To Rem</button>
		<button class="button" @click="run('decode')">To Pixel</button>
		<div class="columns">
			<div class="column">
				<input
					class="input"
					type="text"
					placeholder="source"
					v-model="source"
				/>
			</div>
			<div class="column">
				<input
					readonly
					class="input"
					type="text"
					placeholder="result"
					v-model="result"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "tkl-pixel-rem",
	data() {
		return {
			source: "",
			result: "",
			rootFont: 16,
		};
	},
	methods: {
		run(type) {
			if (type == "encode") {
				this.result = parseInt(this.source, 10) / this.rootFont;
			} else {
				this.result = parseInt(this.source, 10) * this.rootFont;
			}
		},
	},
};
</script>

<style></style>
