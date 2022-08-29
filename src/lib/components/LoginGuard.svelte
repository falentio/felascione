<script lang="ts" context="module">
	export const tokenSymbol = Symbol()
</script>

<script lang="ts">
	import { onMount } from "svelte"
	import { goto } from "$app/navigation"
	onMount(() => {
		const { pathname } = window.location;
		if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
			return
		}

		const token = sessionStorage.getItem("PRKITA-TOKEN")
		if (!token) {
			goto("/admin/login");
			return;
		}
	})
</script>

<slot />