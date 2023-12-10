<script>
	import { onMount } from 'svelte';
	import { draggable, dropzone } from './draggable.js';
	import { load } from './+page.js';
	export let data;

	/**@type { typeof data.packages }*/
	let packages = [];

	onMount(() => {
		//try to get day3 packages from localstorage, if not there get them from data.packages
		packages = JSON.parse(localStorage.getItem('day3-Packages') ?? 'null') || data.packages;

		//save packages to localstorage
		localStorage.setItem('day3-Packages', JSON.stringify(packages));
	});

	/**
	 *
	 * @param id {string}
	 *
	 */
	function setItemToPacked(id) {
		packages = packages.map((pack) => {
			if (pack.id === id) {
				if (pack.weight + sleighWeight > 100) {
					alert('You have no room for this package!');
					return pack;
				}
				pack.inSleigh = true;
			}
			return pack;
		});
		save();
	}
	/**
	 *
	 * @param id {string}
	 *
	 */
	function unload(id) {
		packages = packages.map((pack) => {
			if (pack.id === id) {
				pack.inSleigh = false;
			}
			return pack;
		});
		save();
	}

	function unloadAll() {
		packages = packages.map((pack) => {
			pack.inSleigh = false;
			return pack;
		});
		save();
	}

	function save() {
		localStorage.setItem('day3-Packages', JSON.stringify(packages));
	}

	let loadSheetOpen = false;

	$: notPackedPackages = packages.filter((pack) => !pack.inSleigh);
	$: packedPackages = packages.filter((pack) => pack.inSleigh);
	$: sleighWeight = packedPackages.reduce((acc, pack) => acc + pack.weight, 0);
</script>

<svelte:head>
	<title>Advent of Svelte - Day 3</title>
</svelte:head>
<h1>Sleigh Load Balancer (SLB™)</h1>
<div class="slb-wrapper">
	<div class="package-wrapper">
		<h2>Package list</h2>
		{#each notPackedPackages as pack (pack.id)}
			<section class="package" use:draggable={pack.id}>
				<h3>{pack.name}</h3>
				<p>{pack.weight} kg</p>
			</section>
		{/each}
	</div>
	<div class="sleigh">
		<div class="header">
			<h2>Sleigh load zone</h2>
			<button on:click={unloadAll}>Unload all</button>
		</div>
		<div
			class="load-zone"
			use:dropzone={{
				on_dropzone: setItemToPacked
			}}
		>
			<p>Drop packages here! You have room for {Math.round((100 - sleighWeight) * 100) / 100}kg</p>
		</div>
		<h3 class="load-sheet-header">
			Load sheet (total: {Math.round(sleighWeight * 100) / 100}kg)
			<button on:click={() => (loadSheetOpen = !loadSheetOpen)}
				>{loadSheetOpen ? 'Hide' : 'Show'} load sheet</button
			>
		</h3>

		{#if loadSheetOpen}
			<div class="load-sheet">
				{#each packedPackages as pack (pack.id)}
					<section class="package">
						<h3>{pack.name}</h3>
						<p>{pack.weight} kg</p>
						<button on:click={() => unload(pack.id)}>Unload</button>
					</section>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		&:hover {
			filter: brightness(0.85);
		}
		background-color: var(--christmas-purple);
		color: #fff;
		border: var(--christmas-gold) 2px solid;
	}

	.load-sheet-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 0.5rem;
	}

	.sleigh {
		width: 100%;
	}
	.load-zone {
		border: 3px dashed var(--christmas-red);
		color: #fff;
		height: 150px;
		padding: 1rem;
	}
	h1,
	h2 {
		text-align: center;
	}
	.slb-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.package-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: min-content;
		gap: 0.5rem;
		& h2 {
			grid-column: 1 / -1;
		}
	}
	.package {
		border: 2px solid #fff;
		background-color: var(--christmas-red);
		color: #fff;
		padding: 1rem;
		height: min-content;
		border-radius: 0.5rem;
	}
	.load-sheet {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: min-content;
		gap: 0.5rem;
		& h3 {
			grid-column: 1 / -1;
		}
	}
	.load-zone:global(.droppable) {
		border-color: var(--christmas-gold);
		color: var(--christmas-gold);
	}
	.load-zone:global(.droppable) * {
		pointer-events: none;
	}

	.header {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding-bottom: 1rem;
	}
	@media (max-width: 1100px) {
		.slb-wrapper {
			grid-template-columns: 1fr;
		}
		.sleigh {
			grid-row: 1;
		}
	}
</style>
