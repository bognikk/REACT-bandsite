import axios from "axios";
import { sendRandomPost } from "../../assets/functions/functions";

import { useState } from "react";
import "./Form.scss";
import Button from "../UI/Button/Button";

const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "40518c69-705d-4039-82fd-8693758271c5";

const Form = () => {
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

	const nameInputBlurHandler = () => {
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

	const commentInputBlurHandler = () => {
		setEnteredCommentIsTouched(true);

		if (enteredComment.trim() === "") {
			setEnteredCommentIsValid(false);
			return;
		}
	};

	// ----------SUBMIT
	const handleSubmit = async (event) => {
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

		// POST
		const res = await axios.post(`${BASE_URL}/comments?api_key=${API_KEY}`, {
			name: enteredName,
			comment: enteredComment,
		});

		if (!res.statusText === "OK") {
			throw new Error("Something went wrong!");
		}

		setEnteredName("");
		setEnteredComment("");
	};

	const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;
	const nameInputClasses = nameInputIsValid
		? "form__input invalidField"
		: "form__input";

	const commentInputIsValid = !enteredCommentIsValid && enteredCommentTouched;
	const commentInputClasses = commentInputIsValid
		? "form__textarea invalidField"
		: "form__textarea";
	return (
		<div className="form-container">
			<div className="img-container"></div>
			<form className="form" onSubmit={handleSubmit}>
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
					value={enteredName}
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
					value={enteredComment}
				></textarea>
				{commentInputIsValid && (
					<p className="invalidInput">Comment must not be empty.</p>
				)}
				<div className="form__actions">
					<Button onClick={sendRandomPost} type="button" className="form__btn">
						GENERATE RANDOM COMMENT
					</Button>
					<Button type="submit" className="form__btn">
						COMMENT
					</Button>
				</div>
			</form>
		</div>
	);
};
export default Form;
