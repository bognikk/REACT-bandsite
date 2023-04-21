import axios from "axios";

import "./Social.scss";
import { useEffect, useState } from "react";

import likeIcon from "../../assets/icons/icon-like.svg";
import deleteIcon from "../../assets/icons/icon-delete.svg";

const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

const Social = () => {
	const [allComments, setAllComments] = useState([]);

	// ----------FORM VALIDATION

	// ----------NAME
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameIsTouched] = useState(false);

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);

		if (event.target.value.trim() !== "") {
			setEnteredNameIsValid(true);
		}
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameIsTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}
	};

	// ----------COMMENT
	const [enteredComment, setEnteredComment] = useState("");
	const [enteredCommentIsValid, setEnteredCommentIsValid] = useState(false);
	const [enteredCommentTouched, setEnteredCommentIsTouched] = useState(false);

	const commentInputChangeHandler = (event) => {
		setEnteredComment(event.target.value);

		if (event.target.value.trim() !== "") {
			setEnteredCommentIsValid(true);
		}
	};

	const commentInputBlurHandler = (event) => {
		setEnteredCommentIsTouched(true);

		if (enteredComment.trim() === "") {
			setEnteredCommentIsValid(false);
			return;
		}
	};

	// ----------SUBMIT
	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameIsTouched(true);
		setEnteredCommentIsTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}
		if (enteredComment.trim() === "") {
			setEnteredCommentIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);
		setEnteredCommentIsValid(true);

		console.log("Name:", enteredName);
		console.log("Comment:", enteredComment);

		// setEnteredName("");
		// setEnteredComment("");
	};

	// ----------GET
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
			<div className="post" key={comment.id}>
				<div className="post__img"></div>
				<div className="post__container">
					<div className="post__container__upper">
						<div className="post__name">{comment.name}</div>
						<div className="post__date">{comment.date}</div>
					</div>
					<p className="post__text">{comment.text}</p>
					<div className="post__container__lower">
						<div className="post__container__likes-container">
							<p className="post__likes">{comment.likes}</p>
							<img className="post__icon" src={likeIcon} id="likeBtn" alt="" />
						</div>
						<img
							className="post__icon"
							src={deleteIcon}
							id="deleteBtn"
							alt=""
						/>
					</div>
				</div>
			</div>
		);
	});

	const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
	const nameInputClasses = nameInputIsValid
		? "form__input invalidField"
		: "form__input";

	const commentInputIsValid = !enteredCommentIsValid && enteredCommentTouched;
	const commentInputClasses = commentInputIsValid
		? "form__textarea invalidField"
		: "form__textarea";

	return (
		<section className="social">
			<h2 className="social__heading">Join the Conversation</h2>
			<div className="form-container">
				<div className="img-container"></div>
				<form className="form" onSubmit={formSubmissionHandler}>
					<label className="form__label" htmlFor="name">
						NAME
					</label>
					<input
						onChange={nameInputChangeHandler}
						onBlur={nameInputBlurHandler}
						className={nameInputClasses}
						type="text"
						name="name"
						id="name"
						placeholder="Enter your name"
					/>
					{nameInputIsValid && (
						<p className="invalidInput">Name must not be empty.</p>
					)}

					<label className="form__label" htmlFor="comment">
						COMMENT
					</label>
					<textarea
						onChange={commentInputChangeHandler}
						onBlur={commentInputBlurHandler}
						className={commentInputClasses}
						name="comment"
						placeholder="Add a new comment"
					></textarea>
					{commentInputIsValid && (
						<p className="invalidInput">Comment must not be empty.</p>
					)}

					<button className="form__btn">COMMENT</button>
				</form>
			</div>

			<div className="posts-container">{post}</div>
		</section>
	);
};
export default Social;
