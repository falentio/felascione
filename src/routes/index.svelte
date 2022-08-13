<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<section class=" p-4 bg-zinc-900 text-white flex flex-row justify-between items-end sticky top-0">
	<span class="text-4xl md:text-7xl font-cinzel"> Felascione </span>
</section>

<section class="p-4 flex flex-row gap-2 flex-wrap justify-between shadow-md">
	<div class="w-1/2 flex flex-col gap-2">
		<span class="text-2xl font-cinzel">XII MIPA 1 </span>
		<p class="flex flex-col">
			<span>Smanta '05</span>
			<span>Success with a favourite class.</span>
		</p>
		<a
			class="flex flex-row items-center gap-1 bg-zinc-900 text-white p-1 w-max"
			href="https://instagram.com/felascione"
			target="_blank"
		>
			<Icon icon="mdi:instagram" />
			<span> Instagram </span>
		</a>
	</div>
	<div class="text-right w-5/12">
		<img
			src="https://catsum.deno.dev/300/200"
			width="300"
			height="200"
			class="mx-auto"
			alt="foto kelas"
		/>
		<span class="text-sm ml-auto"> *gapunya foto kelas </span>
	</div>
</section>

<article class="p-4 flex flex-col flex-wrap gap-4">
	<div class="border-b border-black flex flex-col">
		<span class="font-cinzel font-bold"> Jadwal Pelajaran </span>
		<span> Halaman sederhana untuk melihat jadwal pelajaran. </span>
		<span>
			Akan berubah secara berkala, dan akan selalu tersinkronasi dengan Jadwal yang digunakan saat
			ini.</span
		>
		<a href="/jadwal" class="underline text-blue-500 visited:text-blue-700">Klik disini</a>
	</div>
</article>
