<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<section class="p-4 flex flex-row flex-wrap justify-between shadow-sm bg-zinc-800 text-white">
	<div class="w-7/12 flex flex-col gap-2">
		<span class="text-2xl font-cinzel">XII MIPA 1 </span>
		<p class="flex flex-col">
			<span>Smanta '05</span>
			<span>Success with a favourite class.</span>
			<span>SMAN 3 Kota Batu</span>
		</p>
		<div class="flex-auto" />
		<a
			class="flex flex-row items-center gap-1 bg-pastel-blue px-2 py-1 w-max rounded-md text-zinc-900"
			href="https://instagram.com/felascione"
			target="_blank"
		>
			<Icon icon="mdi:instagram" />
			<span> Instagram </span>
		</a>
	</div>
	<div class="text-center rounded-md w-5/12">
		<img
			src="https://catsum.deno.dev/300/200?q=50"
			width="300"
			height="200"
			class="mx-auto object-cover rounded-md"
			alt="foto kelas"
		/>
		<span class="text-sm ml-auto"> *contoh foto </span>
	</div>
</section>

<article class="p-4 flex flex-col flex-wrap gap-4 divide-y divide-black">
	<a class="flex flex-col" href="/jadwal">
		<span class="font-bold">Jadwal Pelajaran</span>
		<span> Halaman sederhana untuk melihat jadwal pelajaran. </span>
		<span>
			Akan berubah secara berkala, dan akan selalu tersinkronasi dengan Jadwal yang digunakan saat
			ini.
		</span>
	</a>
	<div />
</article>
