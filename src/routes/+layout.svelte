<script lang="ts">
	import "../app.css";
	import "@fontsource/abel/400.css";
	import "@fontsource/cinzel/400.css";

	import { MetaTags } from "svelte-meta-tags"

	import { browser } from "$app/environment";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte";
</script>

<MetaTags
	title="Felascione Website - Smanta XII MIPA 1"

	openGraph={{
		type: "website",
		title: "Felascione",
		description: "Website kelas XII MIPA 1 yang sederhana",
		images: [{ url: "https://felascione.pages.dev/favicon.jpg", alt: "Felascione Logo" }],
	}}

	twitter={{
		cardType: "summary",
		site: "@falentio_",
		handle: "@falentio_",
		title: "Felascione",
		description: "Website kelas XII MIPA 1 yang sederhana",
		image: "https://felascione.pages.dev/favicon.jpg",
		imageAlt: "Felascione Logo",
	}}
/>
<Navbar />
<main class="min-h-screen flex flex-col">
	<div class="container mx-auto">
		<slot />
	</div>
	<p class="flex-auto" />
</main>
<Footer />
