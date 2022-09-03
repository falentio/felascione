<script lang="ts">
	import { PUBLIC_PRKITA_URL as prkita } from "$env/static/public";
	import { goto } from "$app/navigation";
	import { format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";

	export let id: string;
	export let dueDate: string;
	export let subject: string;
	export let description: string;
	export let attatchments: Array<{ url: string }> = [];
	const admin = window?.localStorage?.getItem("PRKITA-TOKEN") !== null;
	$: _dueDate = new Date(dueDate);

	let deleteProcess: Promise<void> | null = null;
	async function del(id: string) {
		const token = localStorage.getItem("PRKITA-TOKEN")!;
		const url = new URL("/homework/delete", prkita);
		url.searchParams.set("id", id);
		const res = await fetch(url.href, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${token}`
			}
		});
		if (res.status === 401) {
			goto("/admin/login");
		}
		if (!res.ok) {
			throw new Error("failed to delete");
		}
	}
</script>

<li class="p-1 w-full md:w-1/2">
	<div class="bg-pastel-yellow rounded-md shadow-md p-2 flex flex-col">
		<span class="underline text-xl font-bold">{subject}</span>
		<span class="whitespace-pre-line break-normal">{description}</span>
		<ul>
			{#each attatchments as { url }}
				<li class="">
					<a href={url} class="text-blue-500 hover:underline">{url}</a>
				</li>
			{/each}
		</ul>
		{#if admin}
			<button class="bg-red-500 rounded-md" on:click={() => (deleteProcess = del(id))}>
				Delete
			</button>
		{/if}
		{#if deleteProcess}
			{#await deleteProcess}
				<div class="">Deleting Homework</div>
			{:then}
				<div class="">Successful to delete Homework</div>
			{:catch}
				<div class="bg-pastel-pink">Failed to delete Homework</div>
			{/await}
		{/if}
	</div>
</li>
