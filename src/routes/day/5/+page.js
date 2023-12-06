export const ssr = false;
export const prerender = false;
export async function load({fetch}) {
	const events = await fetch("https://advent.sveltesociety.dev/data/2023/day-five.json").then(r => r.json());
	return {
		events
	}
}