import { get } from 'http';

/*export async function load() {
	const names = await fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json').then(r => r.json());

    return {
		...names
	};
};*/
const names = await fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json').then(r => r.json());

function getNameWithSameLength(name, names) {
	const namesWithSameLength = names.filter(n => n.length == name.length)
	if (namesWithSameLength.length == 0) {
		//return random name
		return [names[Math.floor(Math.random() * names.length)]]
	} 
	return namesWithSameLength
}

function chooseFinalName(name, names) {


	if (names.length == 1) {
		return names[0]
	}
	//find if any name starts with the same letter
	const namesStartingWithSameLetter = names.filter(n => n[0] == name[0])
	if (namesStartingWithSameLetter.length == 1) {
		return namesStartingWithSameLetter[0]
	}
	//return random name
	return names[Math.floor(Math.random() * names.length)]
}

export const actions = {
	default: async function ({request }) {
		const formData = await request.formData();
		const firstName = formData.get('firstname')
		const lastName = formData.get('lastname')

		const elfFirstName = chooseFinalName(lastName ,getNameWithSameLength(firstName, names.firstNames))
		const elfLastName = chooseFinalName(lastName ,getNameWithSameLength(lastName, names.lastNames))

		return {
			firstName,
			lastName,
			elfFirstName,
			elfLastName,
		}
	}
}