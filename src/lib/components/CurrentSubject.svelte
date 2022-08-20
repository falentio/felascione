<script lang="ts">
	import type { Schedules } from "$lib/schedules";
	import { seconds } from "$lib/utils/cron";
	import { format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";
	export let schedules: Schedules;
	let subject = schedules.currentSubject();
</script>

<div class="border-2 border-black bg-pastel-blue p-2 rounded-xl">
	<span class="font-bold"> Sekarang </span>
	<div class="flex flex-col underline">
		<span class=""> Tanggal: {format(new Date(), "eeee, d LLLL y", { locale })} </span>
		{#key $seconds}
			<span> Jam: {format(new Date(), "HH:mm:ss", { locale })} </span>
		{/key}
		{#if subject?.subject}
			<span> Pelajaran: {subject.subject} </span>
		{/if}
		{#if subject?.teacher}
			<span> Pengajar: {subject.teacher} </span>
		{/if}
	</div>
</div>
