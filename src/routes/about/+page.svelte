<div class="outer">
	<h1>Ho-ho-ho! I'm Jørgen Sneisen, Your Arctic Code Elf 🎅</h1>
	<img src="/me2.jpg" class="main-img" alt="me" />
	<div class="paragraph-wrapper">
		<p>
			I'm a frontend developer based in the northern wonderland of Longyearbyen, Svalbard, where the
			temperature is as chilling as the holiday spirit is heartwarming.
		</p>
		<p>
			Longyearbyen, perched at a festive 78 degrees north, is the epitome of a Christmas
			city—blanketed in snow, kissed by the cold, and, according to local tales, hosting the secret
			residence of Santa Claus himself in <a
				href="https://www.spitsbergen-svalbard.com/photos-panoramas-videos-and-webcams/spitsbergen-panoramas/longyearbyen/nye-gruve-2.html"
				target="_blank"
				rel="noopener noreferrer">mine 2b</a
			>.
		</p>
		<p>
			This year, for the <a
				href="https://advent.sveltesociety.dev/#challenges"
				target="_blank"
				rel="noopener noreferrer">Advent of Svelte challenge</a
			>, I've wrapped my code in the theme of <span>Gaudy Christmas 🎄</span>, promising a holiday
			spectacle that's as dazzling as the Northern Lights.
		</p>
		<p>
			So, brace yourself for a sleigh ride through my festive creations and the mesmerizing code
			that powers them!
		</p>
		<p>
			Want to peek behind the scenes? Unwrap the code on <a
				href="https://github.com/jorri11/j-rgensAdventOfSvelte"
				target="_blank"
				rel="noopener noreferrer">GitHub</a
			> and discover the secrets of a coder's winter wonderland.
		</p>
	</div>

	<h2 class="dog-header">And before you go, meet my adorable dog, Penny!</h2>
	<img src="/penny.jpg" alt="Penny, my dog" class="dog-img" />
</div>

<style>
	.outer {
		margin: 0 auto;
		max-width: 860px;
		padding: 0 1rem 1rem 1rem;
	}
	.paragraph-wrapper {
		font-size: 18px;
	}

	.main-img {
		width: 50%;
		max-width: 250px;
		float: right;
		padding: 0 0 0.5rem 0.5rem;
	}
	.dog-header {
		clear: both;
		padding-top: 1rem;
	}
	.dog-img {
		width: 100%;
		max-width: 800px;
	}
	span {
		animation: someanimation 1s infinite;
		color: var(--christmas-gold);
	}
	a {
		color: var(--christmas-gold);
	}
	@keyframes someanimation {
		50% {
			color: var(--christmas-red);
		}
	}
</style>
