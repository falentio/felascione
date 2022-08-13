<script>
	import "../app.css";
	import "@fontsource/abel/400.css";

	import Footer from "$lib/components/Footer.svelte"
</script>

<main class="min-h-screen container mx-auto font-abel flex flex-col justify-between">
	<slot />
	<Footer />
</main>
