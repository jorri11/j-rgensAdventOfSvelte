<script>
	import { morse } from './morse';

	let text = 'hello sven';

	$: textArray = text.split('');
	$: morsed = textArray
		.map((letter) => {
			return (morse[letter.toLowerCase()] ?? '?') + ' ';
		})
		.join('');

	function copyToClipboard(text) {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="page-wrapper">
	<h1>Morse Mischief</h1>
	<label for="in"> Whats your message to Sven? </label>
	<input type="text" bind:value={text} />
	<h2>Send this to Sven:</h2>
	<div class="morse-area">
		<p>{morsed}</p>
	</div>
	<button on:click={() => copyToClipboard(morsed)}>Copy to clipboard</button>
</div>

<style>
	.morse-area {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		padding: 1rem;
		min-height: 75px;
	}

	button {
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		border: none;
		padding: 0.5rem;
		margin-top: 1rem;
	}
	.page-wrapper {
		padding: 0 1rem 1rem 1rem;
	}
	h2 {
		color: var(--christmas-gold);
	}
	input {
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		border: none;
		padding: 0.5rem;
	}
</style>
