<script>
	let budget = 0;

	let gifts = [];

	let title = '';
	let to = '';
	let price = 0;

	function addItem() {
		gifts.push({
			title: title || 'Untitled gift',
			to: to || 'Someone?',
			price,
			id: crypto.randomUUID()
		});
		gifts = gifts;
	}
	function deleteItem(id) {
		gifts = gifts.filter((gift) => gift.id !== id);
	}

	$: total = gifts.reduce((acc, gift) => acc + gift.price, 0);
	$: rest = budget - total;
</script>

<h1>Festive funds</h1>
<label
	>Budget:
	<input type="number" bind:value={budget} min="0" />
</label>

{#if rest > 0}
	<p>
		You have {Intl.NumberFormat('no-nb', {
			style: 'currency',
			currency: 'NOK'
		}).format(rest)} to spend.
	</p>
{:else}
	<p>
		You are {Intl.NumberFormat('no-nb', {
			style: 'currency',
			currency: 'NOK'
		}).format(Math.abs(rest))} over budget
	</p>
{/if}

<ul role="list">
	<li>
		<form>
			<label>
				Gift title:
				<input type="text" name="title" id="title" bind:value={title} />
			</label>
			<label>
				To:
				<input type="text" name="to" id="to" bind:value={to} />
			</label>
			<label>
				Price:
				<input type="number" min="0" name="price" id="price" bind:value={price} />
			</label>
			<button type="button" on:click|preventDefault={addItem}>Add</button>
		</form>
	</li>
	{#each gifts as gift (gift.id)}
		<li class="gifts">
			<span>
				{gift.title} To: {gift.to}, price: {Intl.NumberFormat('no-nb', {
					style: 'currency',
					currency: 'NOK'
				}).format(gift.price)}
			</span>
			<button type="button" class="delete" on:click={() => deleteItem(gift.id)}>X</button>
		</li>
	{:else}
		<li>No gifts</li>
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
	.delete {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		border: solid 1px var(--christmas-green);
	}
	.gifts {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
