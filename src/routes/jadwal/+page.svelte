<script lang="ts">
	import CurrentSubject from "$lib/components/CurrentSubject.svelte";
	import ScheduleCard from "$lib/components/ScheduleCard.svelte";
	import type { SchedulesDefinition } from "$lib/schedules";
	import { Schedules } from "$lib/schedules";

	const schedulesDefinition: SchedulesDefinition = [
		{
			day: 1,
			subjects: [
				{ from: "07:00", subject: "Upacara", teacher: null },
				{ from: "07:45", subject: "SBK", teacher: "Teguh P." },
				{ from: "08:30" },
				{ from: "09:15", subject: "Geografi", teacher: "Shinta D. Nirwana" },
				{ from: "10:00", subject: "Istirahat", teacher: null },
				{ from: "10:15", subject: "Geografi", teacher: "Shinta D. Nirwana" },
				{ from: "11:00", subject: "PJOK", teacher: "Andrie S." },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:05", subject: "MTK Peminatan", teacher: "Ade Nusa" },
				{ from: "12:45" },
				{ from: "13:25", subject: "Bahasa Inggris", teacher: "A. Mutolib" },
				{ from: "14:05", to: "14:45" }
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
				{ from: "12:05", subject: "PKN", teacher: "Agustin" },
				{ from: "12:45" },
				{ from: "13:25", subject: "Bahasa Indonesia", teacher: "Santi J. A." },
				{ from: "14:05", to: "14:45" }
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
				{ from: "12:05", subject: "Kimia", teacher: "Yulia F. H." },
				{ from: "12:45" },
				{ from: "13:25", subject: "Bahasa Indonesia", teacher: "Santi J. A." },
				{ from: "14:05", to: "14:45" }
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
				{ from: "10:15", subject: "Geografi", teacher: "Shinta D. Nirwana" },
				{ from: "11:00" },
				{ from: "11:45", subject: "Istirahat", teacher: null },
				{ from: "12:05", subject: "BK", teacher: "Ajeng A." },
				{ from: "12:45", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "13:25", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "14:05", to: "14:45" }
			]
		},
		{
			day: 5,
			subjects: [
				{ from: "07:00", subject: "Mending Turu", teacher: null },
				{ from: "07:40", subject: "Kimia", teacher: "Yulia F. H." },
				{ from: "08:25" },
				{ from: "09:10", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "09:50", subject: "Istirahat", teacher: null },
				{ from: "10:05", subject: "PAI", teacher: "Athiyyatur R." },
				{ from: "10:45", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "11:25", subject: "Soljum/Keputrian", teacher: null },
				{ from: "12:30", subject: "MTK Wajib", teacher: "Widi A. S." },
				{ from: "13:10", subject: "PKWU", teacher: "Dewi K." },
				{ from: "13:50", to: "14:30" }
			]
		}
	];
	const schedules = new Schedules(schedulesDefinition);
</script>

<div class="p-4 flex flex-col gap-4">
	<div
		class="capitalize font-serif font-bold text-2xl md:text-4xl block text-center rounded-xl bg-pastel-blue p-2 border-2 border-black"
	>
		<span>Jadwal Pelajaran</span>
		<span>XII MIPA 1</span>
	</div>

	<img src="/felascione.jpg" alt="felascione-logo" class="rounded-full w-1/2 mx-auto md:w-1/3" />

	<CurrentSubject {schedules} />
	<ScheduleCard {schedules} />
</div>
