<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	let show = false
	$: pathname = $page.url.pathname
	$: if (browser) {
		const token = localStorage.getItem("PRKITA-TOKEN");
		if (pathname !== "/admin/login" && pathname.startsWith("/admin") && !token) {
			goto("/admin/login");
		} else {
			show = true
		}
	}
</script>

{#if show}
	<slot />
{/if}
