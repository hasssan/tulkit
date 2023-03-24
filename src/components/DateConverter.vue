<template>
	<div>
		<h2 class="title is-3">Date Converter</h2>
		<h3 class="title is-5">Date to ISOString</h3>
		<div class="columns">
			<div class="column buttons">
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTime('stod')"
				>
					Start of The Day
				</button>
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTime('now')"
				>
					Now
				</button>
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTime('eod')"
				>
					End of The Day
				</button>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<VueCtkDateTimePicker
					v-model="sourceToISO"
					format="YYYY-MM-DD HH:mm:ss"
					formatted="YYYY-MM-DD HH:mm:ss"
				/>
			</div>
			<div class="column">
				<input
					readonly
					class="input"
					type="text"
					placeholder="result"
					v-model="resultToISO"
				/>
			</div>
		</div>
		<h3 class="title is-5">ISOString to Locale Date</h3>
		<div class="columns">
			<div class="column buttons">
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTimeIso('stod')"
				>
					Start of The Day
				</button>
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTimeIso('now')"
				>
					Now
				</button>
				<button
					class="button is-small is-primary is-light"
					@click="handleSetTimeIso('eod')"
				>
					End of The Day
				</button>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<input
					class="input"
					type="text"
					placeholder="source"
					v-model="sourceToDate"
				/>
			</div>
			<div class="column">
				<input
					readonly
					class="input"
					type="text"
					placeholder="result"
					v-model="resultToDate"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	name: "tkl-date-conv",
	data() {
		return {
			sourceToISO: moment(),
			sourceToDate: moment().toISOString(),
		};
	},
	computed: {
		resultToISO: function () {
			const source = this.sourceToISO;
			return moment(source).toISOString();
		},
		resultToDate: function () {
			const source = this.sourceToDate;
			return moment(source).format("YYYY-MM-DD HH:mm:ss");
		},
	},
	methods: {
		handleSetTime(type) {
			switch (type) {
				case "stod":
					this.sourceToISO = moment().startOf("day");
					break;
				case "eod":
					this.sourceToISO = moment().endOf("day");
					break;
				default:
					this.sourceToISO = moment();
			}
		},
		handleSetTimeIso(type) {
			switch (type) {
				case "stod":
					this.sourceToDate = moment(moment.utc().startOf("day")).toISOString();
					break;
				case "eod":
					this.sourceToDate = moment(moment.utc().endOf("day")).toISOString();
					break;
				default:
					this.sourceToDate = moment.utc().toISOString();
			}
		},
		appendLeadingZeroes(n) {
			if (n <= 9) {
				return "0" + n;
			}
			return n;
		},
	},
};
</script>

<style></style>
