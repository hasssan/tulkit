<template>
	<section class="section">
		<div class="container">
			<h1 class="title is-1">Tulkit</h1>
			<URIEncoding />
			<hr class="hr" />
			<DateConverter />
			<hr class="hr" />
			<StringConverter />
			<hr class="hr" />
			<PixelRem />
		</div>
	</section>
</template>

<script>
import URIEncoding from "./components/URIEncoding";
import PixelRem from "./components/PixelRemConverter";
import DateConverter from "./components/DateConverter";
import StringConverter from "./components/StringConverter";

export default {
	name: "app",
	components: {
		URIEncoding,
		PixelRem,
		DateConverter,
		StringConverter,
	},
};
</script>

<style lang="scss">
#app {
	font-family: "Ubuntu", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
