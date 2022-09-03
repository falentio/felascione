<script lang="ts">
	import { PUBLIC_PRKITA_URL as prkita } from "$env/static/public";
	import { goto } from "$app/navigation";
	const currentDate = new Date().toISOString().slice(0, 10);
	let subject: string;
	let description: string;
	let dueDate: string = currentDate;
	let homework: Promise<unknown> | null = null;
	let attatchments: Array<{
		type: string;
		url: string;
	}> = [];
	let idle = true;
	let draftAttatchment: string;

	async function createHomework() {
		try {
			idle = false;
			const token = localStorage.getItem("PRKITA-TOKEN")!;
			const headers = new Headers();
			headers.set("Authorization", `Bearer ${token}`);
			headers.set("Content-Type", "application/json");
			const url = new URL("/homework/create", prkita);
			const res = await fetch(url.href, {
				method: "POST",
				headers,
				body: JSON.stringify({
					subject,
					description,
					dueDate,
					attatchments
				})
			});

			if (res.status === 401) {
				localStorage.removeItem("PRKITA-TOKEN");
				goto("/admin/login");
				return;
			}

			if (!res.ok) {
				console.error(await res.text());
				throw new Error("non 2xx status code received");
			}

			const json = await res.json();
			attatchments = [];
			subject = "";
			description = "";
			return json;
		} finally {
			idle = true;
		}
	}

	function addAttatchment(type: string, url: string) {
		attatchments.push({ type, url });
		attatchments = attatchments;
	}

	function removeAttatchment(i: number) {
		attatchments.splice(i, 1);
		attatchments = attatchments;
	}

	function validUrl(url = "") {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}
</script>

<section class="p-4 flex flex-col gap-4">
	<form class="flex flex-col p-4 gap-2 border border-black bg-sky-200">
		<div class="flex flex-col">
			<label for="subject-field"> Subject </label>
			<input
				id="subject-field"
				type="text"
				name="subject"
				bind:value={subject}
				class="bg-gray-100 ring-blue-500 focus:ring-2 outline-none rounded-sm px-1"
			/>
		</div>
		<div class="flex flex-row flex-wrap gap-2">
			<label for="dueDate-field" class="w-full"> Due Date </label>
			<input
				id="dueDate-field"
				type="date"
				name="dueDate"
				bind:value={dueDate}
				class="appearance-none w-max"
			/>
			<button
				type="button"
				class="px-3 py-1 bg-pastel-yellow rounded-sm disabled:text-gray-200 disabled:bg-gray-300 w-max"
				on:click={() => (dueDate = currentDate)}
			>
				Reset
			</button>
		</div>
		<div class="flex flex-col">
			<label for="description-field"> Description </label>
			<textarea
				id="description-field"
				type="textarea"
				name="description"
				bind:value={description}
				rows="4"
				class="bg-gray-100 ring-blue-500 focus:ring-2 outline-none rounded-sm px-1"
			/>
		</div>
		<ul class="flex flex-col gap-1">
			<li>
				<label for="attatchments-field"> Attatchments </label>
			</li>
			{#each attatchments as a, i}
				<li class="flex gap-2">
					<a
						href={a.url}
						class="flex-auto overflow-hidden truncate bg-pastel-yellow rounded-sm shadow-md"
					>
						{a.url}
					</a>
					<button
						type="button"
						class="px-3 py-1 bg-pastel-yellow rounded-sm disabled:text-gray-200 disabled:bg-gray-300"
						on:click={() => removeAttatchment(i)}
					>
						Remove
					</button>
				</li>
			{/each}
			<li class="flex gap-2">
				<input
					id="attatchments-field"
					type="url"
					name="attatchments"
					bind:value={draftAttatchment}
					autocomplete="off"
					class="flex-auto bg-gray-100 ring-blue-500 focus:ring-2 outline-none rounded-sm px-1"
				/>
				<button
					type="button"
					disabled={!validUrl(draftAttatchment)}
					class="px-3 py-1 bg-pastel-blue rounded-sm disabled:text-gray-200 disabled:bg-gray-300"
					on:click={() => addAttatchment("url", draftAttatchment)}
				>
					Add
				</button>
			</li>
		</ul>
		<button
			type="submit"
			disabled={!subject || !description || !idle}
			class="px-3 py-1 bg-pastel-yellow rounded-sm disabled:text-gray-200 disabled:bg-gray-300"
			on:click|preventDefault={() => (homework = createHomework())}
		>
			Create
		</button>
	</form>
	{#if homework}
		{#await homework}
			<div class="block border border-black p-2 bg-sky-100">Creating Homework...</div>
		{:then res}
			<div class="block border border-black p-2 bg-sky-200">Homework Created!!!</div>
		{:catch e}
			<div class="block border border-black p-2 bg-red-200">
				Failed to create homework. {e.message || ":("}
			</div>
		{/await}
	{/if}
</section>
