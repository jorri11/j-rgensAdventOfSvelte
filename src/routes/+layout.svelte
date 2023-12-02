<script>
</script>

<div class="outer">
	<header>
		<div class="wrapper">
			<h1>Jørgens Advent of svelte</h1>
			<nav>
				<a href="/day1">Day 1</a>
				<a href="/about">About</a>
			</nav>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		background-color: var(--christmas-green); /* Christmas Green */
		color: #ffffff; /* White, for text */
	}
	header {
		background-color: var(--christmas-red); /* Christmas Red */
		border-bottom: #ffffff 2px solid; /* White, for border */
		position: sticky;
		top: 0;
		z-index: 2;
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: var(--max-width);
		margin: 0 auto;
	}
	main {
		position: relative;
		max-width: var(--max-width);
		margin: 0 auto;
		z-index: 1;
	}
	nav a {
		color: var(--christmas-gold); /* Christmas Gold */
	}
	nav a:hover {
		color: #ffffff; /* White, for hover effects */
	}
</style>
