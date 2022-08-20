<script lang="ts" context="module">
	import { writable } from "svelte/store";
	export const show = writable(false);
</script>

<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { browser } from "$app/env";
	if (browser) {
		beforeNavigate(() => {
			$show = true;
		});
	}
</script>

<section
	class=" p-4 bg-zinc-900 text-white flex flex-row justify-between items-end sticky top-0"
	class:s={!$show}
>
	<span class="text-4xl md:text-7xl font-cinzel"> Felascione </span>
</section>

<style lang="css">
	.s {
		display: none;
	}
</style>
