<script lang="ts">
	import LoginGuard from "$lib/components/LoginGuard.svelte";
</script>

<LoginGuard>
	<slot />
</LoginGuard>
