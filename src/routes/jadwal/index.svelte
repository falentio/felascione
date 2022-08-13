<script lang="ts">
	import { resolveSubjects } from "$lib/schedules";
	import type { Subject } from "$lib/schedules";
	import { format as _format, parse, getDay, setDay } from "date-fns";
	import id from "date-fns/locale/id/index.js";
	import { onMount } from "svelte";

	const schedules = [
		{
			day: 1,
			subjects: [
				{ from: "07:00", subject: "Upacara", teacher: null },
				{ from: "07:45", subject: "SBK", teacher: "Teguh P." },
				{ from: "08:30" },
				{ from: "09:15", subject: "Geo", teacher: "Shinta D. Nirwana" },
				{ from: "10:00", subject: "Istirahat", teacher: null },
				{ from: "10:15", subject: "Geo", teacher: "Shinta D. Nirwana" },
				{ from: "11:00", subject: "PJOK", teacher: "Andrie S." },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:20", subject: "MTK Peminatan", teacher: "Ade Nusa" },
				{ from: "13:00" },
				{ from: "13:40", subject: "Bahasa Inggris", teacher: "A. Mutolib" },
				{ from: "14:20", to: "15:00" }
			]
		},
		{
			day: 2,
			subjects: [
				{ from: "07:00", subject: "MTK Peminatan", teacher: "Ade Nusa" },
				{ from: "07:45" },
				{ from: "08:30", subject: "Sejarah", teacher: "Susiani" },
				{ from: "09:15" },
				{ from: "10:00", subject: "Istirahat", teacher: null },
				{ from: "10:15", subject: "PJOK", teacher: "Andrie S." },
				{ from: "11:00" },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:20", subject: "PKN", teacher: "Agustin" },
				{ from: "13:00" },
				{ from: "13:40", subject: "Bahasa Indonesia", teacher: "Santi J. A." },
				{ from: "14:20", to: "15:00" }
			]
		},
		{
			day: 3,
			subjects: [
				{ from: "07:00", subject: "Fisika", teacher: "Akbar Kurniawan" },
				{ from: "07:45" },
				{ from: "08:30", subject: "Biologi", teacher: "Sumono" },
				{ from: "09:15" },
				{ from: "10:00", subject: "Istirahat", teacher: null },
				{ from: "10:15", subject: "Jawa", teacher: "Dzakiya Q." },
				{ from: "11:00" },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:20", subject: "Kimia", teacher: "Yulia F. H." },
				{ from: "13:00" },
				{ from: "13:40", subject: "Bahasa Indonesia", teacher: "Santi J. A." },
				{ from: "14:20", to: "15:00" }
			]
		},
		{
			day: 4,
			subjects: [
				{ from: "07:00", subject: "Biologi", teacher: "Sumono" },
				{ from: "07:45" },
				{ from: "08:30", subject: "Fisika", teacher: "Akbar Kurniawan" },
				{ from: "09:15" },
				{ from: "10:00", subject: "Istirahat", teacher: null },
				{ from: "10:15", subject: "Geologi", teacher: "Shinta D. Nirwana" },
				{ from: "11:00" },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:20", subject: "BK", teacher: "Ajeng A." },
				{ from: "13:00", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "13:40", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "14:20", to: "15:00" }
			]
		},
		{
			day: 5,
			subjects: [
				{ from: "07:00", subject: "Mending Turu", teacher: null },
				{ from: "07:40", subject: "Kimia", teacher: "Yulia F. H." },
				{ from: "08:25" },
				{ from: "09:10", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "09:55", subject: "Istirahat", teacher: null },
				{ from: "10:10", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "10:55", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "11:40", subject: "Soljum/Keputrian", teacher: null },
				{ from: "12:10", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "12:40", subject: "PKWU", teacher: "Dewi K." },
				{ from: "13:20", to: "14:00" }
			]
		}
	];

	let dateNow = new Date();
	// dateNow = parse("8 11:20", "d HH:mm", new Date());
	let simple = true;
	let day: number = getDay(dateNow);

	$: subjects = resolveSubjects(schedules.find((i) => i.day === day)?.subjects ?? []);
	$: simpleSubjects = simplifySubjects(subjects);
	$: currentSubject = getCurrentSubject(subjects);
	$: hasPink = subjects.findIndex((i) => i === currentSubject) >= 0 && !simple;
	$: if (day > 6) {
		day = 0;
	} else if (day < 0) {
		day = 6;
	}

	function format(date: Date | number, fmt: string) {
		return _format(date, fmt, { locale: id });
	}

	function getSubjectText(i: Subject) {
		let text = i.subject;
		if (i.teacher) {
			text += ` (${i.teacher})`;
		}
		return text;
	}

	function simplifySubjects(s: Subject[]) {
		const subjects = s.filter((i) => Boolean(i.teacher)).map((i) => i.subject);
		return [...new Set(subjects)];
	}

	function getCurrentSubject(subjects: Required<Subject>[]) {
		return subjects.find((item) => {
			if (day !== getDay(dateNow)) {
				return false;
			}
			const from = parse(item.from, "HH:mm", dateNow);
			const to = parse(item.to, "HH:mm", dateNow);
			return from <= dateNow && dateNow < to;
		});
	}

	onMount(() => {
		const id = setInterval(() => {
			dateNow = new Date();
		}, 1000);

		return () => {
			clearInterval(id);
		};
	});
</script>

<div class="p-4 flex flex-col gap-4">
	<div
		class="capitalize font-serif font-bold text-2xl md:text-4xl block text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
	>
		<span>Jadwal Pelajaran</span>
		<span>XII MIPA 1</span>
	</div>

	<img src="/felascione.jpg" alt="felascione-logo" class="rounded-full w-1/2 mx-auto md:w-1/3" />

	<div class="border-2 border-black bg-pastel-blue p-2 rounded-xl">
		<span class="font-bold"> Sekarang</span>
		<div class="flex flex-col underline">
			<span class=""> Tanggal: {format(dateNow, "eeee, d LLLL y")} </span>
			<span> Jam: {format(dateNow, "HH:mm:ss")} </span>
			{#if currentSubject?.subject}
				<span> Pelajaran: {currentSubject.subject} </span>
			{/if}
			{#if currentSubject?.teacher}
				<span> Pengajar: {currentSubject.teacher} </span>
			{/if}
		</div>
	</div>

	<div class="border-2 border-black bg-pastel-blue p-2 rounded-xl flex flex-col gap-4">
		<div class="flex flex-row relative mb-4">
			<span class="text-2xl font-bold text-center w-full">
				Hari {format(setDay(new Date(), day), "eeee")}
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
				{#each subjects as i (i.from)}
					{@const subject = getSubjectText(i)}
					{@const isCurrentSubject = i === currentSubject}
					<li class="flex flex-row odd:text-blue-700 {isCurrentSubject && 'bg-pastel-pink'}">
						<span class="flex-auto">{subject}</span>
						<span>{i.from} - {i.to}</span>
					</li>
				{/each}
			{/if}
			{#if subjects.length === 0}
				<li class="py-6 bg-pastel-yellow text-center text-2xl font-bold shadow-md">
					Prei!!!
				</li>
			{/if}
			<li />
		</ul>

		{#if hasPink}
			<div class="flex flex-row">
				<span class="bg-pastel-pink"> Background Pink</span>: pelajaran saat ini
			</div>
		{/if}

		<div class="flex flex-row gap-2 flex-wrap justify-center">
			<!-- <button class="bg-pastel-yellow w-24 rounded-md shadow-md" on:click={() => day--}>
				{format(setDay(new Date(), day - 1), "eeee")}
			</button>
			<button class="bg-pastel-yellow w-24 rounded-md shadow-md" on:click={() => day++}>
				{format(setDay(new Date(), day + 1), "eeee")}
			</button> -->
			{#each Array.from({ length: 7 }) as _, i (i)}
				{@const d = i > 5 ? 0 : i + 1}
				<button
					class="bg-pastel-yellow rounded-md shadow-md p-2"
					class:bg-pastel-pink={d === day}
					on:click={() => (day = d)}
					disabled={d === day}
				>
					{format(setDay(new Date(), d), "eeee")}
				</button>
			{/each}
		</div>
	</div>
</div>
