<script>
	import { onDestroy, onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	export let data;
	let events = data.events;

	let int;
	onMount(() => {
		int = setInterval(() => {
			fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
				.then((res) => res.json())
				.then((res) => {
					events = res;
				});
		}, 1000 * 60);
	});
	onDestroy(() => {
		clearInterval(int);
	});

	$: groupedEvents = Object.groupBy(data.events, ({ task }) => task);

	$: fastestWrapper = groupedEvents.WRAPPED_PRESENT.reduce((acc, curr) => {
		if (acc.minutesTaken < curr.minutesTaken) {
			return acc;
		} else {
			return curr;
		}
	});

	$: slowestWrapper = groupedEvents.WRAPPED_PRESENT.reduce((acc, curr) => {
		if (acc.minutesTaken > curr.minutesTaken) {
			return acc;
		} else {
			return curr;
		}
	});

	$: avreageWrapperTime = groupedEvents.WRAPPED_PRESENT.reduce((acc, curr) => {
		return acc + curr.minutesTaken;
	}, 0);

	$: fastestCreator = groupedEvents.CREATED_TOY.reduce((acc, curr) => {
		if (acc.minutesTaken < curr.minutesTaken) {
			return acc;
		} else {
			return curr;
		}
	});

	$: slowestCreator = groupedEvents.CREATED_TOY.reduce((acc, curr) => {
		if (acc.minutesTaken > curr.minutesTaken) {
			return acc;
		} else {
			return curr;
		}
	});

	$: avreageCreatorTime = groupedEvents.CREATED_TOY.reduce((acc, curr) => {
		return acc + curr.minutesTaken;
	}, 0);

	// function for creating a more readable timestamp
	function formatTime(dateString) {
		const date = new Date(dateString);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes} on ${date.toDateString()}`;
	}
</script>

<svelte:head>
	<title>Advent of Svelte - Day 5</title>
</svelte:head>
<div class="layout-wrapper">
	<h1>Elf Productivity Dashboard</h1>

	<section class="recent">
		<h2>Most recent events</h2>
		<ul role="list">
			{#each events.slice(-15).toReversed() as event (event.date + event.elf)}
				<li animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
					<h2>{event.task.replace('_', ' ')}</h2>
					<p>Elapsed time: {event.minutesTaken} minutes</p>
					<p>Assignee: {event.elf}</p>
					<p>{formatTime(event.date)}</p>
				</li>
			{/each}
		</ul>
	</section>
	<div class="stats-wrapper">
		<h2>Some elf stats</h2>
		<section class="card avreage purple">
			<h2>Avreage wrapper time</h2>
			<p>
				{Math.round((avreageWrapperTime / groupedEvents.WRAPPED_PRESENT.length) * 10) / 10} minutes
			</p>
		</section>

		<section class="card fast first green">
			<h2>Fastest wrapper</h2>
			{#if fastestWrapper}
				<p>
					{fastestWrapper.elf} wrapped a present in {fastestWrapper.minutesTaken} minutes
				</p>
			{/if}
		</section>

		<section class="card slow red">
			<h2>Slowest wrapper</h2>
			{#if slowestWrapper}
				<p>
					{slowestWrapper.elf} wrapped a present in {slowestWrapper.minutesTaken} minutes
				</p>
			{/if}
		</section>

		<section class="card avreage purple">
			<h2>Avreage creator time</h2>
			<p>{Math.round((avreageCreatorTime / groupedEvents.CREATED_TOY.length) * 10) / 10} minutes</p>
		</section>

		<section class="card fast second green">
			<h2>Fastest creator</h2>
			{#if fastestCreator}
				<p>
					{fastestCreator.elf} created a toy in {fastestCreator.minutesTaken} minutes
				</p>
			{/if}
		</section>

		<section class="card slow red">
			<h2>Slowest creator</h2>
			{#if slowestCreator}
				<p>
					{slowestCreator.elf} created a toy in {slowestCreator.minutesTaken} minutes
				</p>
			{/if}
		</section>
	</div>
</div>

<style>
	.card.avreage {
		grid-row: span 2;
		grid-column: 3;
	}
	.card.fast {
		grid-column: 1 / span 2;
	}
	.card.fast.first {
		grid-row: 2;
	}
	.card.fast.second {
		grid-row: 4;
	}
	.card.slow {
		grid-column: 1 / span 2;
	}
	.stats-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
		grid-auto-rows: min-content;
		& h2 {
			grid-column: 1 / -1;
		}
	}
	h1 {
		grid-column: 1/-1;
	}
	.layout-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
	.card {
		padding: 1rem;
	}
	.card.purple {
		background-color: var(--christmas-purple);
		border: 2px solid var(--christmas-gold);
	}
	.card.green {
		background-color: #fff;
		color: var(--christmas-green);
	}
	.card.red {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		margin: 0 0.5rem;
	}

	ul {
		margin: 0;
		padding: 1rem;
	}
	li {
		font-weight: bolder;
		padding: 0.5rem;
		display: grid;
		grid-template-columns: 1fr auto;
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

	@media (max-width: 750px) {
		.layout-wrapper {
			grid-template-columns: 1fr;
		}
	}
</style>
