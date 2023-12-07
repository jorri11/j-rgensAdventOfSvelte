<script>
	let beats = [];
	let numberOfBeats;
	let recs = [];

	$: accumulatedDifferenceBetweenBeats =
		beats.length >= 2
			? beats.reduce((acc, curr, index) => {
					if (index > 0) {
						acc += curr - beats[index - 1];
					}
					return acc;
			  }, 0)
			: 0;
	$: avreageBeats = beats.length >= 2 ? accumulatedDifferenceBetweenBeats / (beats.length - 1) : 0;

	$: bpm = beats.length >= 2 ? 60000 / avreageBeats : 0;

	let lastBpm = 0;
	let lastGetTime = 0;
	$: getReccomendations(bpm, lastBpm, lastGetTime, Date.now())
		.then((res) => {
			recs = res;
			lastBpm = bpm;
			lastGetTime = Date.now();
		})
		.catch((e) => {
			//do nothing
		});
	async function getReccomendations(bpm, lastBpm, lastGetTime, now) {
		if (!shouldGetReccomendations(lastBpm, bpm, lastGetTime, now)) {
			throw new Error('Not time to get reccomendations yet');
		}
		return await fetch(`/api/day/6?bpm=${Math.round(bpm)}`).then((res) => res.json());
	}

	function shouldGetReccomendations(lastBpm, newBpm, lastGetTime, now) {
		if (bpm < 50) {
			return false;
		}
		return (
			(Math.abs(lastBpm - newBpm) > 10 && Math.abs(lastGetTime - now) > 1000 * 45) ||
			Math.abs(lastGetTime - now) > 1000 * 60 * 2
		);
	}

	function onBeat(e) {
		if (beats.length == numberOfBeats) {
			beats.shift();
		}
		beats.push(Date.now());
		beats = beats;
	}
	function onKeyPress(e) {
		if (e.code == 'Space') {
			onBeat(e);
		}
	}
	function reset() {
		beats = [];
	}
</script>

<svelte:window on:keyup={onKeyPress} />
<div class="page-wrapper">
	<h1>Misteltoe metronome</h1>
	<section class="the-actual-assignment">
		<p>Press spacebar to the beat or press <span class="flair">The Big Purple Button™</span></p>
		<div class="centering">
			<div class="realtime-wrapper">
				<div class="realtime-top"></div>
				<div class="realtime red">
					<p>{Math.round(bpm) ?? 0} bpm</p>
				</div>
			</div>
		</div>
		<div class="button-wrapper">
			<button class="increase" on:click={reset}>Reset</button>
			<select bind:value={numberOfBeats} class="decrease">
				<option value={4} selected>Low smooting</option>
				<option value={8}>Medium smooting</option>
				<option value={16}>High smooting</option>
			</select>

			<button on:click={onBeat} class="big-purple-button">The Big Purple Button™</button>
		</div>
	</section>
	<section>
		<h2>Reccomendations</h2>
		<ul role="list">
			{#each recs?.tracks ?? [] as track}
				<li>
					<h3>{track.name} - {track.artists[0].name}</h3>
					<a href={track.external_urls.spotify}>Listen on spotify</a>
				</li>
			{:else}
				<li>
					<h3>No reccomendations yet</h3>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
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
		& a {
			color: var(--christmas-green);
		}
	}
	li:nth-child(odd) {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		margin: 0 0.5rem;
		& a {
			color: var(--christmas-gold);
		}
	}
	.increase {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		border: var(--christmas-gold) 2px solid;
	}

	.decrease {
		background-color: var(--christmas-green);
		color: var(--christmas-gold);
		border: var(--christmas-gold) 2px solid;
	}
	.centering {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 1rem;
	}
	.page-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
		padding: 0 0.5rem 0.5rem 0.5rem;
		& h1 {
			grid-column: 1 / -1;
			text-align: center;
		}
		& .the-actual-assignment {
			text-align: center;
		}
	}
	.button-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.big-purple-button {
		grid-column: 1 / -1;
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		padding: 10px;
		border-radius: 10px;
		border: none;
		font-size: 1.5rem;
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
	.flair {
		animation: someanimation 1s infinite;
		color: var(--christmas-gold);
	}
	@keyframes someanimation {
		50% {
			color: var(--christmas-red);
		}
	}
</style>
