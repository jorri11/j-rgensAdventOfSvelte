export async function load({fetch}) {
	let packages = await fetch('https://advent.sveltesociety.dev/data/2023/day-thirteen.json').then(r => r.json());

	let deliveries = [];
	let currentDelivery = { totalWeight: 0, packages: []};

	packages.forEach(pkg => {
		if (currentDelivery.totalWeight + pkg.weight > 100) {
			deliveries.push(currentDelivery);
			currentDelivery = { totalWeight: 0, packages: []};
		}
		currentDelivery.totalWeight += pkg.weight;
		currentDelivery.packages.push(pkg);
	});

	return {
		deliveries: deliveries,
		totalDeliveries: deliveries.length,
		avreageWeight: deliveries.reduce((acc, cur) => acc + cur.totalWeight, 0) / deliveries.length
	}
}