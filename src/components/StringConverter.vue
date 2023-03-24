<template>
	<div>
		<h2 class="title is-3">String Converter</h2>
		<h3 class="title is-5">Upper/Lower Case</h3>
		<div class="columns">
			<div class="column">
				<input
					class="input"
					type="text"
					placeholder="to UPPER"
					v-model="toUp"
				/>
			</div>
			<div class="column">
				<input
					class="input"
					type="text"
					placeholder="to lower"
					v-model="toLo"
				/>
			</div>
		</div>
		<h3 class="title is-5">Capitalize</h3>
		<div class="columns">
			<div class="column">
				<input
					class="input"
					type="text"
					placeholder="source"
					v-model="sourceCap"
				/>
			</div>
			<div class="column">
				<input
					readonly
					class="input"
					type="text"
					placeholder="Capitalized"
					v-model="resultCap"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "tkl-string-conv",
	data() {
		return {
			sourceUL: "",
			resultUL: "",
			sourceCap: "",
		};
	},
	computed: {
		toUp: {
			get: function() {
				return this.sourceUL;
			},
			set: function(newValue) {
				this.sourceUL = newValue;
				this.resultUL = newValue.toUpperCase();
			},
		},
		toLo: {
			get: function() {
				return this.resultUL;
			},
			set: function(newValue) {
				this.resultUL = newValue;
				this.sourceUL = newValue.toLowerCase();
			},
		},
		resultCap: function() {
			return this.sourceCap
				.toLowerCase()
				.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
		},
	},
	methods: {},
};
</script>

<style></style>
