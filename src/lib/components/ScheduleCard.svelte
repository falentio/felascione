<script lang="ts">
	import type { Subject, Schedules } from "$lib/schedules";
	import { format, setDay } from "date-fns";
	import locale from "date-fns/locale/id/index.js";

	export let schedules: Schedules;
	let day = new Date().getDay();
	let simple = true;
	$: subjects = schedules.getSubjects(day);
	$: simpleSubjects = [
		...new Set(subjects.filter((i) => Boolean(i.teacher)).map((i) => i.subject))
	];

	function getSubjectText(i: Subject) {
		let text = i.subject;
		if (i.teacher) {
			text += ` (${i.teacher})`;
		}
		return text;
	}
</script>

<div class="border-2 border-black bg-pastel-blue p-2 rounded-xl flex flex-col gap-4">
	<div class="flex flex-row relative mb-4">
		<span class="text-2xl font-bold text-center w-full">
			Hari {format(setDay(new Date(), day), "eeee", { locale })}
		</span>
		<button
			class="w-12 h-12 rounded-full absolute right-0 bg-pastel-yellow shadow-md bordfer-2 border-black click:bg-black"
			on:click={() => (simple = !simple)}
		>
			{simple ? "Simple" : "Full"}
		</button>
	</div>
	<ul class="divide-y divide-black">
		{#if simple}
			{#each simpleSubjects as name (name)}
				<li class="text-center text-xl">{name}</li>
			{/each}
		{:else}
			{#each subjects as i (i.from + i.subject)}
				<li
					class="flex flex-row even:text-blue-700 justify-between overflow-auto inline-block"
					class:bg-pastel-pink={i.current}
				>
					<span class="w-2/3">{getSubjectText(i)}</span>
					<span>{i.from} - {i.to}</span>
				</li>
			{/each}
		{/if}
		{#if subjects.length === 0}
			<li class="py-6 bg-pastel-yellow text-center text-2xl font-bold shadow-md">Prei!!!</li>
		{/if}
		<li />
	</ul>

	{#if !simple && subjects.some(i => i.current)}
		<div class="flex flex-row">
			<span class="bg-pastel-pink"> Background Pink</span>: pelajaran saat ini
		</div>
	{/if}

	<div class="flex flex-row gap-2 flex-wrap justify-center">
		{#each Array.from({ length: 7 }) as _, i (i)}
			{@const d = i > 5 ? 0 : i + 1}
			<button
				class="bg-pastel-yellow rounded-md shadow-md p-2"
				class:bg-pastel-pink={d === day}
				on:click={() => (day = d)}
				disabled={d === day}
			>
				{format(setDay(new Date(), d), "eeee", { locale })}
			</button>
		{/each}
	</div>
</div>
