<script lang="ts">
	import Icon from "@iconify/svelte";

	let show = false;
</script>

<nav
	class="py-2 px-4 bg-pastel-blue flex flex-row flex-wrap justify-between border-b-2 border-black"
>
	<span class="text-3xl md:text-5xl"><a href="/">Felascione</a></span>
	<button
		on:click={() => (show = !show)}
		class="text-center text-3xl md:text-5xl flex flex-col items-center relative peer md:hidden"
	>
		<Icon icon="mdi:menu" />
	</button>
	<ul class="{show ? 'flex' : 'hidden'} flex-col w-full md:text-xl md:flex md:flex-row md:gap-4">
		<li><a href="/">Home</a></li>
		<li><a href="/jadwal">Jadwal</a></li>
	</ul>
</nav>

<style>
	nav > ul {
		animation: dig 300ms ease-in-out forwards;
	}
	@keyframes dig {
		0% {
			opacity: 0;
			transform: scaleX(0);
		}
		100% {
			opacity: 1;
			transform: scaleX(1);
		}
	}
</style>
