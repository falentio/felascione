<script lang="ts">
	import "../app.css";
	import "@fontsource/abel/400.css";
	import "@fontsource/cinzel/400.css";

	import { browser } from "$app/env"
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<main 
	class="min-h-screen container mx-auto font-abel flex flex-col z-10"
	class:h={!browser} 
>
	<Header />
	<slot />
	<div class="flex-auto" />
	<Footer />
</main>

<style type="text/css">
	.h {
		display: none;
	}
</style>