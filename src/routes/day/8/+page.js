function generatePairsArray(length, rangeStart, rangeEnd) {
	const array = [];
	const usedNumbers = new Set();
	while (array.length < length) {
		const number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
		if (!usedNumbers.has(number)) {
			usedNumbers.add(number);
			array.push({id: crypto.randomUUID(), cardId: number, showing: false, disabled: false, found: false});
			array.push({id: crypto.randomUUID(), cardId: number, showing: false, disabled: false, found: false});
		}
	}
	return array;
}

function shuffleArray(originalArray) {
	const array = [...originalArray];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}


export async function load() {
	const numbers = generatePairsArray(24, 1, 24);
	const shuffled = shuffleArray(numbers);
	return {
		cards: shuffled
	}
}