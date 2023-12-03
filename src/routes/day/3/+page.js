export async function load({ fetch }) {
	const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-three.json");
	if (!res.ok) {
		throw new Error(`Could not load data: ${res.status} ${res.statusText}`);
	}
	/** @type {{ name: string, weight: number}[]} */
	const data = await res.json();
	// add a uuid to each item
	const withId = data.map(item => {
		return {
			...item,
			id: crypto.randomUUID(),
			inSleigh: false,
		}
	});
	return {
		packages: withId,
	}

}