<script lang="ts">
	import { onMount } from "svelte"
	import Icon from "@iconify/svelte"
	let text = "s"

	onMount(() => {
		setTimeout(() => text = " :", 8_000)
		setTimeout(() => text = " :)", 11_000)
		setTimeout(() => text = " :(", 11 * 8 * 2005)
		return () => {
		}
	})
</script>

<section class="bg-zinc-900 p-4 text-gray-100 flex flex-col">
	<span class="text-center">
		Made With &#9829 For My Friend{text}
	</span>
</section>
