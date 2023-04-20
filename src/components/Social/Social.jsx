import axios from "axios";

import "./Social.scss";
import { useEffect, useState } from "react";

import likeIcon from "../../assets/icons/icon-like.svg";
import deleteIcon from "../../assets/icons/icon-delete.svg";

const Social = () => {
	const [allComments, setAllComments] = useState([]);

	const BASE_URL = "https://project-1-api.herokuapp.com";
	const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

	// GET
	useEffect(() => {
		const getComments = async () => {
			const res = await axios.get(`${BASE_URL}/comments?api_key=${API_KEY}`);

			if (!res.statusText === "OK") {
				throw new Error("Something went wrong!");
			}

			let ALL_COMMENTS = [];

			res.data.forEach((comment) => {
				ALL_COMMENTS.unshift({
					name: comment.name,
					text: comment.comment,
					date: new Date(comment.timestamp).toLocaleDateString("en-GB"),
					id: comment.id,
					likes: comment.likes,
				});
			});

			setAllComments(ALL_COMMENTS);
		};

		getComments();
	}, []);

	const post = allComments.map((comment) => {
		return (
			<div class="post" key={comment.id}>
				<div class="post__img"></div>
				<div class="post__container">
					<div class="post__container__upper">
						<div class="post__name">{comment.name}</div>
						<div class="post__date">{comment.date}</div>
					</div>
					<p class="post__text">{comment.text}</p>
					<div class="post__container__lower">
						<div class="post__container__likes-container">
							<p class="post__likes">{comment.likes}</p>
							<img class="post__icon" src={likeIcon} id="likeBtn" />
						</div>
						<img class="post__icon" src={deleteIcon} id="deleteBtn" />
					</div>
				</div>
			</div>
		);
	});

	return (
		<section className="social">
			<h2 className="social__heading">Join the Conversation</h2>
			<div className="form-container">
				<div className="img-container"></div>
				<form id="form" className="form">
					<label className="form__label" htmlFor="name">
						NAME
					</label>
					<input
						className="form__input"
						type="text"
						name="name"
						id="name"
						placeholder="Enter your name"
					/>

					<label className="form__label" htmlFor="comment">
						COMMENT
					</label>
					<textarea
						className="form__textarea"
						name="comment"
						placeholder="Add a new comment"
					></textarea>
					<button className="form__btn">COMMENT</button>
				</form>
			</div>

			<div className="posts-container">{post}</div>
		</section>
	);
};
export default Social;
