<script>
	let cookieCount = 0;

	function increase() {
		cookieCount++;
	}

	function decrease() {
		cookieCount--;
	}

	function reset() {
		cookieCount = 0;
	}
</script>

<div class="page-wrapper">
	<div>
		<h1>Santas cookie counter</h1>
		<div class="img-wrapper">
			<img
				class="spinning"
				src="/santaMouth.png"
				style="--spin: {cookieCount * 10}deg"
				alt="Santas mouth"
			/>
			<img src="/santawithoutMouth.png" alt="santa" />
		</div>

		<p>Cookie count: {cookieCount}</p>
		<button class="increase" on:click={increase}>Eat cookie</button>
		{#if cookieCount > 0}
			<button class="decrease" on:click={decrease}>Un-eat(?) cookie</button>
			<button class="reset" on:click={reset}>Reset</button>
		{/if}
	</div>
</div>

<style>
	.page-wrapper {
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.img-wrapper {
		position: relative;
	}
	img {
		width: 400px;
		height: 400px;
		grid-column: 1;
		grid-row: 1;
	}
	.spinning {
		position: absolute;
		top: 53%;
		left: 38.5%;
		width: 46px;
		height: 27px;
		transform: rotate(calc(var(--spin) + 180deg));
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		&:hover {
			filter: brightness(0.85);
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
	.reset {
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		border: var(--christmas-gold) 2px solid;
	}
</style>
