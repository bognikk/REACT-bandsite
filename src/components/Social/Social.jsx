import axios from "axios";

import "./Social.scss";
import { useEffect, useState } from "react";

import Form from "../Form/Form";
import Comment from "../Comment/Comment";
import Modal from "../UI/Modal/Modal";

const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

const Social = () => {
	const [allComments, setAllComments] = useState([]);
	const [showModal, setShowModal] = useState(false);

	// ----------GET
	const getComments = async () => {
		const res = await axios.get(`${BASE_URL}/comments?api_key=${API_KEY}`);

		if (!res.statusText === "OK") {
			throw new Error("Something went wrong!");
		}

		let FETCHED_COMMENTS = [];

		res.data.forEach((comment) => {
			FETCHED_COMMENTS.unshift({
				name: comment.name,
				text: comment.comment,
				date: new Date(comment.timestamp).toLocaleDateString("en-GB"),
				id: comment.id,
				likes: comment.likes,
			});
		});

		setAllComments(FETCHED_COMMENTS);
	};

	useEffect(() => {
		getComments();
	}, [allComments]);

	// DELETE
	const deleteCommentHandler = async (id) => {
		try {
			const res = await axios.delete(
				`${BASE_URL}/comment/${id}?api_key=${API_KEY}`
			);
			console.log(res);
		} catch (error) {
			if (error) {
				setShowModal(true);
			}
		}
	};

	// PUT
	const addLikeHandler = async (comment) => {
		const res = await axios.put(
			`${BASE_URL}/comments/${comment.id}/like?api_key=${API_KEY}`,
			{
				likes: 1,
			}
		);

		if (!res.statusText === "OK") {
			throw new Error("Something went wrong!");
		}
	};

	return (
		<section className="social">
			<h2 className="social__heading">Join the Conversation</h2>
			<Form />
			<Comment
				commentsProp={allComments}
				onDelete={deleteCommentHandler}
				onLike={addLikeHandler}
			/>
			{showModal && (
				<Modal
					messageOne={"Something went wrong!"}
					messageTwo={"Please try again later!"}
					onClose={() => setShowModal(false)}
				/>
			)}
		</section>
	);
};
export default Social;
