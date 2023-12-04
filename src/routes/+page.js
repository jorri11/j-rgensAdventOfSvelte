import { redirect } from "@sveltejs/kit";
import days from "$lib/days";
export async function load() {
	throw redirect(307,"/day/" + days.at(-1) ?? 1);	
}
