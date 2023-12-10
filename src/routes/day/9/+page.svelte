<script>
	import { onMount } from 'svelte';

	function getTimeUntilCE() {
		const christmasEve = new Date(2023, 11, 24);
		const now = new Date();
		const timeUntilChristmasEve = christmasEve - now;
		const daysUntilChristmasEve = Math.floor(timeUntilChristmasEve / (1000 * 60 * 60 * 24));
		const hoursUntilChristmasEve = Math.floor(
			(timeUntilChristmasEve % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutesUntilChristmasEve = Math.floor(
			(timeUntilChristmasEve % (1000 * 60 * 60)) / (1000 * 60)
		);
		const secondsUntilChristmasEve = Math.floor((timeUntilChristmasEve % (1000 * 60)) / 1000);
		return {
			days: daysUntilChristmasEve,
			hours: hoursUntilChristmasEve,
			minutes: minutesUntilChristmasEve,
			seconds: secondsUntilChristmasEve
		};
	}

	onMount(() => {
		const interval = setInterval(() => {
			time = getTimeUntilCE();
		}, 1000);
		return () => clearInterval(interval);
	});

	let time = getTimeUntilCE();
</script>

<div class="page-wrapper">
	<h1>Santa's final countdown</h1>
	<div class="realtime-wrapper">
		<div class="realtime-top"></div>
		<div class="realtime red">
			<p>{time.days} days</p>
		</div>
	</div>
	<div class="realtime-wrapper">
		<div class="realtime-top"></div>
		<div class="realtime purple">
			<p>{time.hours} hours</p>
		</div>
	</div>
	<div class="realtime-wrapper">
		<div class="realtime-top"></div>
		<div class="realtime red">
			<p>{time.minutes} minutes</p>
		</div>
	</div>
	<div class="realtime-wrapper">
		<div class="realtime-top"></div>
		<div class="realtime purple">
			<p>{time.seconds} seconds</p>
		</div>
	</div>
</div>

<style>
	h1 {
		grid-column: 1 / -1;
		text-align: center;
	}
	.page-wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
	.realtime-wrapper {
		position: relative;
		width: min-content;
		margin-top: 50px;
	}
	.realtime {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
	}

	.realtime.purple {
		background-color: var(--christmas-purple);
	}
	.realtime.red {
		background-color: var(--christmas-red);
	}
	.realtime-top {
		position: absolute;
		top: -35px;
		z-index: -1;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--christmas-gold);
		width: 30px;
		height: 40px;
	}
</style>
