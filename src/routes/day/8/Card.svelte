<script>
	import { createEventDispatcher } from 'svelte';

	export let id;
	export let cardId;
	export let showing = false;
	export let disabled = false;
	export let found;

	const dispatch = createEventDispatcher();

	function onFlip() {
		if (disabled) return;
		if (showing) return;
		dispatch('flip', { id, cardId });
		showing = !showing;
	}
</script>

<button on:click={onFlip}>
	{#if !showing}
		<div class="front">
			<h1>Santas Cards</h1>
		</div>
	{:else}
		<div class="back" class:found>
			<img src={`https://advent.sveltesociety.dev/data/2023/day-eight/${cardId}.png`} alt="card" />
		</div>
	{/if}
</button>

<style>
	button {
		width: 166px;
		height: 247px;
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		border: none;
		padding: 0;
	}
	.found {
		border: solid 1px lime;
	}
</style>
