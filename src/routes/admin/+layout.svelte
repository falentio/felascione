<script lang="ts">
	import { goto } from "$app/navigation"
	import { browser } from "$app/environment"

	const href = "https://nory.my.id/class/cdl6mtu3ncmc315qqosg"
	browser && goto(href)
</script>

<div>
	Pindah ke website ini <a {href} class="text-blue-500"> {href}</a>
</div>
<slot />
