<template>
	<div class="container">
		<h2 class="title is-3">URI Decode / Encode</h2>
		<div class="columns">
			<div class="column">
				<textarea
					class="textarea"
					v-model="decoded"
					placeholder="Decode Here"
				></textarea>
			</div>
			<div class="column">
				<textarea
					class="textarea"
					v-model="encoded"
					placeholder="Encode Here"
				></textarea>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "tkl-uri-encoding",
	data() {
		return {
			source: "",
			result: "",
		};
	},
	computed: {
		encoded: {
			get: function() {
				return this.source;
			},
			set: function(newValue) {
				console.log("enc newValue", newValue);
				this.source = newValue;
				this.result = this.run("encode", newValue);
			},
		},
		decoded: {
			get: function() {
				return this.result;
			},
			set: function(newValue) {
				console.log("dec newValue", newValue);
				this.result = newValue;
				this.source = this.run("", newValue);
			},
		},
	},
	methods: {
		run(type, value) {
			if (type == "encode") {
				return encodeURIComponent(value);
			} else {
				return decodeURIComponent(value);
			}
		},
	},
};
</script>

<style></style>
