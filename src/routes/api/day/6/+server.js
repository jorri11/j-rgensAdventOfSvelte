import { json } from "@sveltejs/kit"
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";
export async function GET({fetch, url}){
	const bpm = url.searchParams.get("bpm");

	const params = new URLSearchParams();
	params.append("grant_type", "client_credentials");
	params.append("client_id", SPOTIFY_CLIENT_ID);
	params.append("client_secret", SPOTIFY_CLIENT_SECRET);

	const auth = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		Headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: params,
	}).then(r => r.json());

	const headers = new Headers();
	headers.append("Authorization", `Bearer ${auth.access_token}`);

	const recUrl = new URL("https://api.spotify.com/v1/recommendations");
	recUrl.searchParams.append("limit", 5);
	recUrl.searchParams.append("market", "US");
	recUrl.searchParams.append("seed_genres", "pop");
	recUrl.searchParams.append("min_popularity", 70);
	recUrl.searchParams.append("target_tempo", bpm ?? 100);
	let recs = await fetch(recUrl, {
		method: "GET",
		headers: headers
	});
	recs = await recs.json();
	return json(recs)
}