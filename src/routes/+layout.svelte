<script>
	import { onNavigate } from '$app/navigation';

	let dropdownOpen = false;

	const days = [1, 2];

	onNavigate(() => {
		dropdownOpen = false;
	});
</script>

<div class="outer">
	<header>
		<div class="wrapper">
			<h1>Jørgens Advent of svelte</h1>
			<nav>
				<div class="dropdown-wrapper">
					<button class="menu-item" on:click={() => (dropdownOpen = !dropdownOpen)}
						>Days {dropdownOpen ? 'v' : '^'}</button
					>
					{#if dropdownOpen}
						<div class="dropdown">
							{#each days as day}
								<a href="/day/{day}" class="menu-item">Day {day}</a>
							{/each}
						</div>
					{/if}
				</div>
				<a href="/about" class="menu-item">About</a>
			</nav>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	.menu-item {
		background-color: transparent;
		border: none;
		color: var(--christmas-gold); /* Christmas Gold */
		cursor: pointer;
		text-decoration: none;
	}
	.menu-item:hover {
		color: #ffffff; /* White, for hover effects */
	}

	.dropdown-wrapper {
		position: relative;
	}
	.dropdown {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		padding: 0.5rem;
		background-color: var(--christmas-red);
		border: #fff 2px solid;
		border-top: none;
		width: max-content;
		display: flex;
		flex-direction: column;
	}
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
	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	nav a {
		color: var(--christmas-gold); /* Christmas Gold */
	}
	nav a:hover {
		color: #ffffff; /* White, for hover effects */
	}
</style>
