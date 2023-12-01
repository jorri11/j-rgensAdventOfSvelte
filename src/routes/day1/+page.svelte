<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;

	/** @type { {name: string, tally: number}[] | undefined} */
	let fromLocalStorage;

	onMount(() => {
		fromLocalStorage = JSON.parse(localStorage.getItem('list') ?? 'null');
	});

	let list = fromLocalStorage ?? data.originalList;
	let search = '';

	/**
	 * @param { {name: string, tally: number}[] } things
	 */
	function save(things) {
		console.log('DEYÅ');
		if (!browser) return;
		localStorage.setItem('list', JSON.stringify(things));
	}

	$: filteredList = list.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
	$: list, save(list);
</script>

<h1>Day 1 Naughty/Nice Tally</h1>
<input type="search" name="search" id="search" bind:value={search} placeholder="Search" />
<ul role="list">
	{#each filteredList as item (item.name)}
		<li>
			<span>
				{item.name}, {item.tally < 0 ? 'Naugthy' : 'Nice!'} ({item.tally})
			</span>
			<button on:click={() => item.tally++}>+</button>
			<button on:click={() => item.tally--}>-</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding: 1rem;
	}
	li {
		font-weight: bolder;
		padding: 0.5rem;
		display: grid;
		grid-template-columns: 1fr auto auto;
	}
	/**Make each other li item a bit lighter green with a filter*/
	li:nth-child(even) {
		background-color: #fff;
		color: var(--christmas-green);
	}
	li:nth-child(odd) {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		margin: 0 0.5rem;
	}
</style>
