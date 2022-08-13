<script>
	import "../app.css";
	import "@fontsource/abel/400.css";
	import "@fontsource/cinzel/400.css";

	import Footer from "$lib/components/Footer.svelte"
</script>

<main class="min-h-screen container mx-auto font-abel flex flex-col z-10">
	<slot />
	<div class="flex-auto" />
	<Footer />
</main>
