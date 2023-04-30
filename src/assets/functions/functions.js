import axios from "axios";
const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

// ----------SEND RANDOM POST
export const sendRandomPost = async () => {
	// get random user
	const resUser = await axios.get("https://randomuser.me/api");

	if (!resUser.statusText === "OK") {
		throw new Error("Something went wrong!");
	}

	const RANDOM_USER = resUser.data.results[0];

	const fullName = RANDOM_USER.name.first + " " + RANDOM_USER.name.last;
	const comment =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio velit ex itaque voluptas magnam maxime est pariatur neque! Ad, beatae maxime? Blanditiis ducimus ipsa voluptates voluptas id ullam repudiandae aspernatur!";

	// send random post
	const resSend = await axios.post(`${BASE_URL}/comments?api_key=${API_KEY}`, {
		name: fullName,
		comment: comment,
	});

	if (!resSend.statusText === "OK") {
		throw new Error("Something went wrong!");
	}
};
