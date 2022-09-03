<script lang="ts">
	import Icon from "@iconify/svelte";
	import { PUBLIC_PRKITA_URL as prkita } from "$env/static/public";
	import { page } from "$app/stores"
	import { browser } from "$app/environment"
	import { addDays, format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";
	import HomeworkCard from "$lib/components/HomeworkCard.svelte";
	const currentDate = format(new Date(), "yyyy-MM-dd");
	let dueDate: string = currentDate;
	$: dueDate = $page.url.searchParams.get("dueDate") ?? dueDate
	$: homeworks = getHomeworks(dueDate);

	function getWhatsappShareUrl(dueDate: string): string {
		const shareUrl = new URL("/pr", $page.url)
		shareUrl.searchParams.set("dueDate", dueDate)
		const whatsapp = new URL("whatsapp://send")
		whatsapp.searchParams.set("text", shareUrl.href)
		return whatsapp.href
	}

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
	class="m-4 flex flex-col gap-4 justify-center text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
>
	<div class="flex flex-row justify-center text-xl gap-4">
		<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={prevDay}> Prev </button>
		<input type="date" name="dueDate-field" bind:value={dueDate} />
		<button class="bg-pastel-yellow shadow-md rounded-md px-2" on:click={nextDay}> Next </button>
	</div>

	<a class="w-max p-2 bg-[#25D366] rounded-md flex flex-row mx-auto items-center gap-2 w-1/2 md:w-1/4" href={getWhatsappShareUrl(dueDate)}>
		<span>Share to whatsapp</span>
		<Icon icon="mdi:whatsapp" class="text-white w-1/6 h-max"/>
	</a>
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
