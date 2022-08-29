<script lang="ts">
	import { PUBLIC_PRKITA_URL as prkita } from "$env/static/public";
	import { goto } from "$app/navigation";
	const searchParams = new URLSearchParams();
	let username: string;
	let password: string;
	let token: Promise<void> | null = null;
	function login() {
		token = setToken();
		token.then(async () => {
			await delay(500);
			goto("/admin");
		});
	}
	const delay = (n: number) => new Promise((r) => setTimeout(r, n));

	async function setToken() {
		const url = new URL("/auth/login", prkita);
		url.searchParams.set("username", username);
		url.searchParams.set("password", password);
		const res = await fetch(url.href);
		if (!res.ok) {
			console.error(res.status);
			throw new Error("failed to login");
		}
		const body = await res.json();
		sessionStorage.setItem("PRKITA-TOKEN", body.token);
	}
</script>

<section class="flex flex-col items-center">
	<form class="rounded-sm m-4 p-2 border-2 border-black flex flex-col gap-4 max-w-md w-2/3 mx-auto">
		<div class="flex flex-col">
			<label for="username-input-field"> Username </label>
			<input
				id="username-input-field"
				type="text"
				name="username"
				class="focus:ring-blue-500 focus:ring-2 focus:outline-none p-2 bg-gray-100 rounded-sm shadow-md ring-1 ring-black"
				placeholder="Abelia Narindi Agsya"
				bind:value={username}
			/>
		</div>
		<div class="flex flex-col">
			<label for="password-input-field"> Password </label>
			<input
				id="password-input-field"
				type="password"
				name="password"
				class="focus:ring-blue-500 focus:ring-2 focus:outline-none p-2 bg-gray-100 rounded-sm shadow-md ring-1 ring-black"
				placeholder="******-*******-*****"
				bind:value={password}
			/>
		</div>
		<div class="flex flex-row justify-center">
			<button
				disabled={!username || !password}
				type="submit"
				class="px-3 py-1 bg-pastel-blue rounded-sm disabled:text-gray-200 disabled:bg-gray-300"
				on:click|preventDefault={login}
			>
				Login
			</button>
		</div>
		{#if token}
			{#await token}
				<span class="rounded-sm p-4 ring-2 ring-black"> Logging in... </span>
			{:then}
				<span class="rounded-sm p-4 ring-2 ring-blue-500 bg-blue-50"> Successfull </span>
			{:catch e}
				<span class="rounded-sm p-4 ring-2 ring-red-500 bg-red-50"> Failed to login </span>
			{/await}
		{/if}
	</form>
</section>
