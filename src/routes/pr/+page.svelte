<script lang="ts">
	import Icon from "@iconify/svelte";
	import { PUBLIC_NORY_URL as nory } from "$env/static/public";
	import { page } from "$app/stores"
	import { browser } from "$app/environment"
	import { addDays, format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";
	// import HomeworkCard from "$lib/components/HomeworkCard.svelte";
	const currentDate = format(new Date(), "yyyy-MM-dd");
	let dueDate: string = currentDate;
	$: homeworks = getHomeworks(dueDate);
	if (browser) {
		dueDate = new URL(window.location).searchParams.get("dueDate") ?? dueDate
	}

	function prevDay() {
		dueDate = format(addDays(new Date(dueDate), -1), "yyyy-MM-dd");
	}

	function nextDay() {
		dueDate = format(addDays(new Date(dueDate), +1), "yyyy-MM-dd");
	}

	async function getHomeworks(dueDate: string) {
		const url = new URL("/class/cdl6mtu3ncmc315qqosg/task", nory);
		url.searchParams.set("from", new Date(dueDate).toISOString());
		url.searchParams.set("to", new Date(new Date(dueDate).getTime() + 86400_000).toISOString());
		const res = await fetch(url.href);
		if (!res.ok) {
			throw new Error("failed to fetch");
		}

		return res.json();
	}

</script>

<section
	class="m-4 flex flex-col gap-1 justify-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
>
	<div class="flex flex-row justify-center text-xl gap-4">
		<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={prevDay}> Prev </button>
		<input type="date" name="dueDate-field" bind:value={dueDate} />
		<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={nextDay}> Next </button>
	</div>
</section>


{#await homeworks}
	<section
		class="m-4 flex flex-row justify-between text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
	>
		Loading...
	</section>
{:then { data: tasks }}
	<section class="m-4 rounded-xl bg-pastel-blue p-2 border-2 border-black">
		<ul class="flex flex-row flex-wrap justify-center">
			{#each tasks as task (task.taskId)}
				<li class="p-1 w-full md:w-1/2">
					<div class="bg-pastel-yellow rounded-md shadow-md p-2 flex flex-col">
						<span class="underline text-xl font-bold">{task.name}</span>
						<span class="whitespace-pre-line break-normal">{task.description}</span>
					</div>
				</li>
			{:else}
				<li>???</li>
			{/each}
		</ul>
		{#if tasks.length}
			<div class="rounded-md p-2"> Semangat teman-teman</div>
		{/if}
	</section>
{:catch e}
	<section
		class="m-4 flex flex-row justify-between text-center rounded-xl bg-pastel-pink p-2 border-2 border-black"
	>
		Gagal mendapatkan daftar PR <br />
		{e.message}
	</section>
{/await}
