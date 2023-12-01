export async function load({fetch}) {
	const req = await fetch("https://advent.sveltesociety.dev/data/2023/day-one.json");
	/** @type { {name: string, tally: number}[] } */
	const json = await req.json();
	return {
		originalList: json,
	}
}