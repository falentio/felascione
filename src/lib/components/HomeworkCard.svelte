<script lang="ts">
	import { format } from "date-fns";
	import locale from "date-fns/locale/id/index.js";

	export let id: string
	export let dueDate: string
	export let subject: string
	export let description: string
	export let attatchments: Array<{ url: string }> = []
	$: _dueDate = new Date(dueDate)
</script>

<li class="p-1 w-full md:w-1/2">
	<div class="bg-pastel-yellow rounded-md shadow-md p-2 flex flex-col">
		<span class="underline">Mata Pelajaran: {subject}</span>
		<span>{description}</span>
		<ul>
			{#each attatchments as {url}}
				<li class="">
					<a href={url} class="text-blue-500 hover:underline">{url}</a>
				</li>
			{/each}
		</ul>
	</div>
</li>