<script lang="ts">
	import "../app.css";
	import "@fontsource/abel/400.css";
	import "@fontsource/cinzel/400.css";

	import { browser } from "$app/environment";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte";
</script>

<LoginGuard />
<Navbar />
<main class="min-h-screen flex flex-col">
	<div class="container mx-auto">
		<slot />
	</div>
	<p class="flex-auto" />
</main>
<Footer />
