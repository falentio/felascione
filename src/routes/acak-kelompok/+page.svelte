<script lang="ts">
	import { XorshiftRng, FoolRandomizer } from "$lib/fool_randomizer"

	interface Student {
		attendanceNumber: number;
		name: string;
		gender: string;
	}

	const rng = new XorshiftRng("Noryvn")
	const fool = new FoolRandomizer<Student>(rng)

	function addStudents(attendanceNumber: number, name: string, gender: string) {
		const s = {
			attendanceNumber,
			name,
			gender
		};
		fool.addItem(s)
		return s;
	}

	addStudents(1, "Abelia", "female");
	addStudents(2, "Adinda", "female");
	addStudents(3, "Afandi", "male");
	addStudents(4, "Agnes", "female");
	addStudents(5, "Alfiko", "male");
	addStudents(6, "Alya", "female");
	addStudents(7, "Anastasia", "female");
	addStudents(8, "Angda", "male");
	addStudents(9, "Angga", "male");
	addStudents(10, "Arzydhan", "male");
	addStudents(11, "Aulinisa", "female");
	addStudents(12, "Ayuhana", "female");
	addStudents(13, "Dava", "male");
	addStudents(14, "Elang", "male");
	addStudents(15, "Eva", "female");
	addStudents(16, "Gilang", "male");
	addStudents(17, "Jovita", "female");
	addStudents(18, "Kaka", "male");
	addStudents(19, "Karoline", "female");
	addStudents(20, "Marisa", "female");
	addStudents(21, "Marista", "female");
	addStudents(22, "Mike", "female");
	addStudents(23, "Nadia", "female");
	addStudents(24, "Nayla", "female");
	addStudents(25, "Ni Putu", "female");
	addStudents(26, "Riska", "female");
	addStudents(27, "Rivaldi", "male");
	addStudents(28, "Sindi", "female");
	addStudents(29, "Tjokorda", "female");
	addStudents(30, "Wanda", "female");

	let teamsCount = 2;
	let seed = "hai"
	let teams: Student[][] = [];
	fool.createConflict(i => ["Abelia", "Rivaldi"].includes(i.name))
	fool.createChain(i => ["Nadia", "Gilang"].includes(i.name))
	$: if (true) {
		fool.rng.setSeed(seed);
		teams = fool
			.split(teamsCount)
			.map(i => i.sort((a, b) => a.attendanceNumber - b.attendanceNumber))
	}
</script>

<section class="flex flex-col justify-center p-4 gap-4 items-center">
	<div
		class="flex flex-col flex-wrap gap-2 rounded-sm bg-pastel-blue p-2 border-2 border-black shadow-md rounded-md"
	>
		<div class="flex flex-row gap-2 items-center">
			<span class=""> Jumlah Kelompok: </span>
			<button
				class="w-12 bg-pastel-yellow rounded-md p-2 disabled:bg-gray-300 disabled:text-gray-200"
				on:click={() => teamsCount--}
				disabled={teamsCount <= 2}
			>
				-
			</button>
			<span class="w-12 text-center"> {teamsCount} </span>
			<button
				class="w-12 bg-pastel-yellow rounded-md p-2 disabled:bg-gray-300 disabled:text-gray-200"
				on:click={() => teamsCount++}
				disabled={teamsCount >= fool.items.length / 3}
			>
				+
			</button>
		</div>
		<label class="flex flex-row items-center">
			<span class="capitalize w-full">
				combination id 
			</span>
			<input type="text" name="" bind:value={seed} class="p-2" />
		</label>
		<button
			class="bg-pastel-yellow rounded-md shadow-md h-8"
			on:click={() => {
				seed = (Math.random() * 1000 | 0).toString()
			}}
		>
			Acak
		</button>
		<div>
			<span class="bg-pastel-pink">Background Pink:</span> Laki Laki
		</div>
	</div>
	<div class="flex flex-row flex-wrap w-full rounded-md justify-center">
		{#each teams as team, i}
			<div class="basis-1/2 md:basis-1/4 p-2">
				<ul class="bg-pastel-blue rounded-md shadow-md border-2 border-black p-2 h-full">
					<li class="text-2xl">
						Kelompok {i + 1}
					</li>
					<li class="flex flex-col">
						<span>
							Jumlah Anggota: {team.length}
						</span>
						<span>
							Laki-laki: {team.filter((i) => i.gender === "male").length}
						</span>
						<span>
							Perempuan: {team.filter((i) => i.gender === "female").length}
						</span>
					</li>
					<li class="text-2xl">Anggota:</li>
					{#each team as { name, attendanceNumber, gender } (name)}
						<li class:bg-pastel-pink={gender === "male"}>{attendanceNumber}. {name}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
