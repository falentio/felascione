<script lang="ts">
	import { PUBLIC_PRKITA_URL as prkita } from "$env/static/public";
	import { addDays, format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";
	import HomeworkCard from "$lib/components/HomeworkCard.svelte";
	const currentDate = format(new Date(), "yyyy-MM-dd");
	let dueDate: string = currentDate;
	$: homeworks = getHomeworks(dueDate);

	function prevDay() {
		dueDate = format(addDays(new Date(dueDate), -1), "yyyy-MM-dd");
	}

	function nextDay() {
		dueDate = format(addDays(new Date(dueDate), +1), "yyyy-MM-dd");
	}

	async function getHomeworks(dueDate: string) {
		const url = new URL("/homework/list", prkita);
		url.searchParams.set("date", dueDate);
		const res = await fetch(url.href);
		if (!res.ok) {
			throw new Error("failed to fetch");
		}

		return res.json();
	}
</script>

<section
	class="m-4 flex flex-row flex-wrap justify-between text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
>
	<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={prevDay}> Prev </button>
	<input type="date" name="dueDate-field" bind:value={dueDate} />
	<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={nextDay}> Next </button>
</section>

{#await homeworks}
	<section
		class="m-4 flex flex-row justify-between text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
	>
		Loading...
	</section>
{:then res}
	<section class="m-4 rounded-xl bg-pastel-blue p-2 border-2 border-black">
		<ul class="flex flex-row flex-wrap justify-center">
			{#each res as pr (pr.id)}
				<HomeworkCard {...pr} />
			{:else}
				<li>???</li>
			{/each}
		</ul>
	</section>
{:catch e}
	<section
		class="m-4 flex flex-row justify-between text-center rounded-xl bg-pastel-pink p-2 border-2 border-black"
	>
		Gagal mendapatkan daftar PR
	</section>
{/await}

<section />
