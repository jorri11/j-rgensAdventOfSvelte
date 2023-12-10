<script>
	import { onMount, tick } from 'svelte';
	import Card from './Card.svelte';
	import { invalidateAll } from '$app/navigation';
	export let data;

	onMount(() => {
		bestComparisons = localStorage.getItem('day8_bestComparisons');
	});

	let firstFlip;
	let secondFlip;

	let totalComparisons = 0;
	let bestComparisons = null;

	$: if (data.cards.filter((card) => !card.found) == 0) {
		if (!bestComparisons || totalComparisons < bestComparisons) {
			bestComparisons = totalComparisons;
			localStorage.setItem('day8_bestComparisons', bestComparisons);
		}
		alert('You won!');
	}

	function onFlip(e) {
		if (firstFlip) {
			secondFlip = e.detail;
			doGameCalculation();
		} else {
			firstFlip = e.detail;
		}
	}

	function disableAll() {
		data.cards = data.cards.map((card) => {
			card.disabled = true;
			return card;
		});
	}
	function enableAll() {
		data.cards = data.cards.map((card) => {
			card.disabled = false;
			return card;
		});
	}

	function doGameCalculation() {
		totalComparisons++;
		if (firstFlip.cardId == secondFlip.cardId) {
			// Match!
			data.cards = data.cards.map((card) => {
				if (card.cardId == firstFlip.cardId) {
					card.found = true;
				}
				return card;
			});
			firstFlip = null;
			secondFlip = null;
		} else {
			// No match
			disableAll();
			setTimeout(() => {
				data.cards = data.cards.map((card) => {
					if (card.id == firstFlip.id || card.id == secondFlip.id) {
						card.showing = false;
					}
					return card;
				});
				firstFlip = null;
				secondFlip = null;
				enableAll();
			}, 1000);
		}
	}

	function reset() {
		invalidateAll();
	}
</script>

<h1>Santas card game</h1>
{#if bestComparisons}
	<h2>Best moves: {bestComparisons}</h2>
{/if}
<p>Total moves: {totalComparisons}</p>
<div class="grid">
	{#each data.cards ?? [] as card (card.id)}
		<Card
			on:flip={onFlip}
			id={card.id}
			cardId={card.cardId}
			bind:showing={card.showing}
			bind:found={card.found}
			disabled={card.disabled}
		/>
	{/each}
</div>
<button on:click={reset}>Reset</button>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-gap: 5px;
	}
	button {
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		border: none;
		padding: 0.5rem;
		margin-top: 1rem;
	}
</style>
