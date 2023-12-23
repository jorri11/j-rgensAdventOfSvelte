<script>
	export let data;

	//create an array of false values number of items in data.deliveries
	let open = Array(data.deliveries.length).fill(false);
</script>

<h2>Sleigh Load Balancer 2 (SLB™)</h2>
<ul role="list">
	{#each data.deliveries as item, index (index)}
		<li>
			<div>
				Delivery #{index + 1},
				{Math.round(item.totalWeight * 100) / 100} kg
				<button on:click={() => (open[index] = !open[index])}
					>{open[index] ? 'Close' : 'Open'}</button
				>
			</div>
			{#if open[index]}
				<ul>
					{#each item.packages as gift}
						<li>{gift.name} {gift.weight} kg</li>
					{/each}
				</ul>
			{/if}
		</li>
	{:else}
		<li>No results</li>
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
