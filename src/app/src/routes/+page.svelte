<script lang="ts">
	import { wallet } from '$lib/wallet';

	let greeting = $state('');
	let name = $state('');

	async function onSubmit(event: MouseEvent) {
		if (!$wallet.connected) await wallet.connect();
		if (!$wallet.connected) return;

		greeting = await $wallet.actor.greet(name);
	}
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
		<label for="name" class="block text-gray-700 font-bold mb-2">Enter your name;</label>
		<input
			id="name"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
			alt="Name"
			type="text"
			bind:value={name}
			required
		/>

		<button
			type="submit"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			onclick={onSubmit}>Click Me!</button
		>
	</div>

	<section id="greeting" class="mt-4 font-bold text-xl mb-2">{greeting}</section>
</main>
