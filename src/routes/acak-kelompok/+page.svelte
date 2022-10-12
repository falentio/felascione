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
	let chains: string[][] = [
	];
	let chain: string[] = []
	let conflict: string[] = []
	let selected = ""
	let selectedConflict = ""
	let showChain = false
	let showConflict = false

	$: if (true) {
		rng.setSeed(seed);
		fool.clearChain();
		fool.clearConflict();
		chains.forEach((chain, i) => {
			if (chain.length > (fool.items.length / teamsCount | 0)) {
				chains.splice(i, 1)
				chains = chains
				return
			}
			chain.sort()
			fool.createChain(i => chain.includes(i.name))
		})
		fool.createChain(i => ["Nadia", "Gilang"].includes(i.name))
		fool.createChain(i => ["Angda", "Ayuhana", "Adinda", "Elang", "Kaka"].slice(teamsCount).includes(i.name))
		if (conflict.length > teamsCount) {
			conflict = conflict.slice(0, teamsCount)
		}
		fool.createConflict(i => conflict.includes(i.name))
		fool.createConflict(i => ["Abelia", "Rivaldi"].includes(i.name))
		teams = fool
			.split(teamsCount)
			.map(i => i.sort((a, b) => a.attendanceNumber - b.attendanceNumber))
	}
</script>

<section class="flex flex-col justify-center p-4 gap-4 items-center">
	<div
		class="flex flex-col flex-wrap gap-2 rounded-sm bg-pastel-blue p-2 border-2 border-black shadow-md rounded-md w-full"
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
			<span class="capitalize w-max">
				id:
			</span>
			<input type="text" name="" bind:value={seed} class="p-2 flex-auto ml-2 rounded focus:outline-none focus:ring-2 ring-sky-500" />
		</label>
		<button class="w-full bg-pastel-yellow rounded p-1" on:click={() => showChain = !showChain}> Chain </button>
		<p class="hidden"></p>
		<ul class="w-full divide-y divide-black" class:hidden={!showChain}>
			<li class="flex flex-col">
				<p> Murid yang memiliki <span class="italic">Chain</span> akan selalu berada dalam satu kelompok </p>
				<ul class="flex flex-row flex-wrap">
					{#each chain as name, i (name)}
						<li class="mr-2 p-1 bg-green-400 rounded my-1">
							<button
								class="w-full h-full"
								on:click={() => {
									chain.splice(i, 1)
									chain = chain
								}}
							>
								{name}
							</button> 
						</li>
					{/each}
					<li class="flex-auto"/>
					<li class="mr-auto">
						<button
							class="bg-pastel-yellow disabled:bg-gray-300 disabled:text-gray-200 p-1 rounded"
							disabled={chain.length < 2 || chain.length > (fool.items.length / teamsCount | 0)}
							on:click={() => {
								chains.push(chain)
								chain = [];
								chains = chains;
							}}
						>
							Add 
						</button>
					</li>
				</ul>
				<select 
					class="focus:outline-none p-2 rounded" 
					bind:value={selected} 
					on:change={() => {
						if (selected) {
							chain.push(selected)
							chain = chain
							selected = ""
						}
					}}
				>
					<option value=""> Pilih nama siswa </option>
					{#each fool.getItems().filter(i => !chains.flat().includes(i.name) && !chain.includes(i.name)) as { name } (name)}
						<option value={name}>{name}</option>
					{/each}
				</select>
			</li>
			{#each chains as chain, i}
				<li class="w-full my-2">
					<div class="flex flex-row justify-between">
						<span> Chain No {i + 1}. </span>
						<button 
							on:click={() => { 
								chains.splice(i, 1)
								chains = chains
							}}
							class="rounded bg-red-500 p-1"
						> 
							Delete
						</button>
					</div>
					<ul class="flex flex-row flex-wrap">
						{#each chain as name}
							<li class="mr-2 my-1 p-1 bg-green-400 rounded">
								{name}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
			<li />
		</ul>
		<button class="w-full bg-pastel-yellow rounded p-1" on:click={() => showConflict = !showConflict}> Conflict </button>
		<ul class="w-full divide-y divide-black" class:hidden={!showConflict}>
			<li class="flex flex-col">
				<p> 
					Murid yang memiliki <span class="italic">Conflict</span> tidak akan berada dalam satu kelompok.
					Memiliki prioritas lebih tinggi di banding <span class="italic"> Chain </span> 
				</p>
				<select 
					class="focus:outline-none p-2 rounded disabled:bg-gray-300 disabled:text-gray-100"
					disabled={conflict.length >= teamsCount}
					bind:value={selectedConflict} 
					on:change={() => {
						if (conflict.includes(selectedConflict)) {
							return
						}
						if (selectedConflict) {
							conflict.push(selectedConflict)
							conflict = conflict
							selectedConflict = ""
						}
					}}
				>
					<option value=""> Pilih nama siswa </option>
					{#each fool.getItems() as { name } (name)}
						<option value={name}>{name}</option>
					{/each}
				</select>
				<p class:hidden={conflict.length < teamsCount}> Jumlah Conflict tidak bisa melebihi jumlah kelompok </p>
			</li>
			<ul class="flex flex-row flex-wrap">
				{#each conflict as name, i}
					<li class="mr-2 my-1 p-1 bg-green-400 rounded">
						<button
							on:click={() => {
								conflict.splice(i, 1)
								conflict = conflict
							}}
						>
							{name}
						</button>
					</li>
				{/each}
			</ul>
			<li />
		</ul>
		<button
			class="bg-pastel-yellow rounded h-8"
			on:click={() => {
				seed = (Math.random() * 10000 | 0).toString()
			}}
		>
			Acak
		</button>
		<div>
			<span class="bg-green-400">Background Hijau:</span> Laki Laki
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
						<li class:bg-green-400={gender === "male"}>{attendanceNumber}. {name}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
