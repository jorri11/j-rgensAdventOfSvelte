<script>
	export let form;
</script>

<div class="page-wrapper">
	<h1>Elf Name Generator</h1>
	<form method="post">
		<label for="first">First name</label>
		<input type="text" id="first" name="firstname" required value={form?.firstName ?? ''} />
		<label for="last">Last name</label>
		<input type="text" id="last" name="lastname" required value={form?.lastName ?? ''} />
		<button type="submit">GIVE ME MY ELF NAME</button>
	</form>
	{#if form}
		<h1>Your elf name is: <span>{form.elfFirstName} {form.elfLastName}</span></h1>
	{/if}
</div>

<style>
	.page-wrapper {
		padding: 0 1rem;
		display: grid;
		place-items: center;
	}
	form {
		max-width: 400px;
		display: flex;
		flex-direction: column;
	}
	label {
		margin-top: 1rem;
		color: var(--christmas-gold);
	}
	input {
		margin-top: 0.5rem;
		background-color: var(--christmas-red);
		color: var(--christmas-gold);
		border: none;
		padding: 0.5rem;
	}
	button {
		margin-top: 1rem;
		background-color: var(--christmas-purple);
		color: var(--christmas-gold);
		border: solid 1px var(--christmas-gold);
		padding: 0.5rem;
	}
	h1 {
		margin-top: 2rem;
	}
	span {
		animation: someanimation 1s infinite;
		color: var(--christmas-gold);
	}
	@keyframes someanimation {
		50% {
			color: var(--christmas-red);
		}
	}
</style>
