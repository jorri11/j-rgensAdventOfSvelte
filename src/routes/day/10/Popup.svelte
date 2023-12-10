<script>
	import { onMount } from 'svelte';
	import { confetti } from '@neoconfetti/svelte';
	let dialog;
	let showConf = false;
	onMount(() => {
		setTimeout(() => {
			dialog.show();
			showConf = true;
		}, 4000);
	});
</script>

<dialog bind:this={dialog}>
	<h1>🎅🌟 Ho Ho Ho! Merry Christmas and Happy Holidays! 🌟🎄</h1>

	<p>Dear Visitor,</p>
	<p>
		As the snowflakes dance and the holiday magic fills the air, Santa Claus himself sends his
		warmest greetings straight to you! 🎁✨ May your days be merry, your heart be light, and your
		holidays be filled with joy and delight.
	</p>
	<p>
		Wishing you a season sprinkled with love, laughter, and all the enchantment this festive time
		brings. Remember, the best way to spread Christmas cheer is singing loud for all to hear! 🎶
	</p>
	<p>
		May the spirit of giving and the joy of togetherness be with you and your loved ones. Here's to
		making memories that twinkle brighter than Rudolph's nose!
	</p>
	<p>Merry Christmas and a Happy New Year!</p>
	<p>With festive cheer, Santa Claus 🎅</p>
	<h3>P.S. Don't forget to leave out some milk and cookies on Christmas Eve! 🍪🥛</h3>
	<button
		on:click={() => {
			dialog.close();
		}}>Ive had enough christmas cheer</button
	>
	{#if showConf}
		<div class="confetti" use:confetti={{}}></div>
	{/if}
</dialog>

<style>
	dialog {
		background-color: var(--christmas-red);
		max-width: 850px;
		border: solid 1px #fff;
		color: #fff;
	}
	button {
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		border: solid 1px var(--christmas-gold);
		padding: 0.5rem;
		margin-top: 1rem;
	}
	.confetti {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
