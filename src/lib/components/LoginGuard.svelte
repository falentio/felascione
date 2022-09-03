<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	onMount(() => {
		const { pathname } = window.location;
		const token = localStorage.getItem("PRKITA-TOKEN");
		if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
			return;
		}
		if (!token) {
			goto("/admin/login");
			return;
		}
	});
</script>

<slot />
