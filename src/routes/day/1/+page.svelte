<script>
	import { onMount } from 'svelte';

	export let data;

	/** @type { {name: string, tally: number, id: string}[] | undefined} */
	let fromLocalStorage;

	/** @type { {name: string, tally: number, id: string}[] } */
	let list = [];

	onMount(() => {
		fromLocalStorage = JSON.parse(localStorage.getItem('list') ?? 'null');
		list = fromLocalStorage != null ? fromLocalStorage : data.originalList;
	});

	let search = '';

	/**
	 * @param { {name: string, tally: number}[] } things
	 */
	function save(things) {
		localStorage.setItem('list', JSON.stringify(things));
	}

	/**
	 * @param {string} id
	 */
	function increment(id) {
		const index = list.findIndex((item) => item.id === id);
		list[index].tally++;
		save(list);
	}

	/**
	 * @param {string} id
	 */
	function decrement(id) {
		const index = list.findIndex((item) => item.id === id);
		list[index].tally--;
		save(list);
	}

	function reset() {
		list = data.originalList;
		save(list);
	}

	let filterOpen = false;
	let filterNaughty = true;
	let filterNice = true;

	$: filteredList = list.filter((item) => {
		return (filterNaughty && item.tally < 0) || (filterNice && item.tally >= 0);
	});
	$: searchedList = filteredList.filter((item) => {
		return item.name.toLowerCase().includes(search.toLowerCase());
	});
</script>

<svelte:head>
	<title>Advent of Svelte - Day 1</title>
</svelte:head>
<h1>Day 1 Naughty/Nice Tally</h1>
<div class="filter-input">
	<input type="search" name="search" id="search" bind:value={search} placeholder="Search" />
	<button on:click={() => (filterOpen = !filterOpen)}>Filter</button>
	{#if filterOpen}
		<div class="dropdown">
			<h2>Filter</h2>
			<label>
				Naughty
				<input type="checkbox" name="naughty" id="naughty" bind:checked={filterNaughty} />
			</label>
			<label>
				Nice
				<input type="checkbox" name="naughty" id="naughty" bind:checked={filterNice} />
			</label>
		</div>
	{/if}
</div>
<ul role="list">
	{#each searchedList as item (item.id)}
		<li>
			<span>
				{item.name}, {item.tally < 0 ? 'Naugthy' : 'Nice!'} ({item.tally})
			</span>
			<button on:click={() => increment(item.id)}>+</button>
			<button on:click={() => decrement(item.id)}>-</button>
		</li>
	{:else}
		<li>No results</li>
	{/each}
</ul>
<button type="button" on:click={reset}>Reset list</button>

<style>
	.filter-input {
		position: relative;
		width: fit-content;
		& button {
			position: absolute;
			right: 0;
			top: 0;
		}
		& .dropdown {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: max-content;
			padding: 1rem;
			border-radius: 0.5rem;
			background: var(--christmas-purple);
			border: 2px solid var(--christmas-gold);
			& h2 {
				margin: 0;
				margin-bottom: 0.5rem;
			}
		}
	}
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
