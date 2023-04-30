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
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [commentName, setCommentName] = useState("");
	const [commentId, setCommentId] = useState("");
	const [successfulFetch, setSuccessfulFetch] = useState(true);

	// ----------GET
	const getComments = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/comments?api_key=${API_KEY}`);

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
			setSuccessfulFetch(true);
		} catch (error) {
			if (error) {
				setSuccessfulFetch(false);
			}
		}
	};

	useEffect(() => {
		getComments();
	}, [allComments]);

	// DELETE
	const confirmDeleteCommentHandler = (id, name) => {
		setCommentName(name);
		setCommentId(id);
		setShowConfirmModal(true);
	};

	const deleteCommentHandler = async (id) => {
		try {
			await axios.delete(`${BASE_URL}/comments/${id}?api_key=${API_KEY}`);
		} catch (error) {
			if (error) {
				setShowAlertModal(true);
			}
		}
		setShowConfirmModal(false);
	};

	// PUT
	const addLikeHandler = async (comment) => {
		try {
			await axios.put(
				`${BASE_URL}/comments/${comment.id}/like?api_key=${API_KEY}`,
				{
					likes: 1,
				}
			);
		} catch (error) {
			if (error) {
				setShowAlertModal(true);
			}
		}
	};

	return (
		<section className="social">
			<h2 className="social__heading">Join the Conversation</h2>
			<Form onError={() => setShowAlertModal(true)} />
			<Comment
				commentsProp={allComments}
				onDelete={confirmDeleteCommentHandler}
				onLike={addLikeHandler}
			/>
			{!successfulFetch && (
				<p className="social__errorMessage">
					Failed to fetch comments, we are working on it!
				</p>
			)}
			{showAlertModal && (
				<Modal
					messageTwo={"Please try again later!"}
					onClose={() => setShowAlertModal(false)}
					type="alert"
				/>
			)}
			{showConfirmModal && (
				<Modal
					onClose={() => setShowConfirmModal(false)}
					onConfirm={() => deleteCommentHandler(commentId)}
					name={commentName}
					type="confirm"
				/>
			)}
		</section>
	);
};
export default Social;
